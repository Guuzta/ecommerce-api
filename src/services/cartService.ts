import { prisma } from "../lib/prisma.js";

import AppError from "../utils/AppError.js";

import type {
  ListCartItemsResponse,
  UpdatedCartItemResponse,
} from "../types/cart.js";

import type { AddCartItemsBody } from "../schemas/addCartItemsSchema.js";
import type { UpdateCartItemsBody } from "../schemas/updateCartItemsSchema.js";

const listCartItems = async (
  userId: string,
): Promise<ListCartItemsResponse> => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  const items = cart.cartItems.map((item) => {
    const subtotal = item.quantity * Number(item.product.price);

    return {
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: Number(item.product.price),
      },
      subtotal,
    };
  });

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);

  return {
    cartId: cart.id,
    items,
    total,
    totalItems: items.length,
  };
};

const addCartItems = async (
  userId: string,
  data: AddCartItemsBody,
): Promise<{ message: string }> => {
  const { productId, quantity } = data;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  const finalQuantity = cartItem ? cartItem.quantity + quantity : quantity;

  if (finalQuantity > product.stock) {
    throw new AppError("Requested quantity exceeds available stock.", 409);
  }

  if (cartItem) {
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: finalQuantity,
      },
    });

    return {
      message: "Quantity updated",
    };
  }

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity: finalQuantity,
    },
  });

  return {
    message: "Item added to cart successfully",
  };
};

const updateCartItems = async (
  userId: string,
  cartItemId: string,
  data: UpdateCartItemsBody,
): Promise<UpdatedCartItemResponse> => {
  const { quantity } = data;

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        userId,
      },
    },
    include: {
      product: true,
    },
  });

  if (!cartItem) {
    throw new AppError("Cart item not found", 404);
  }

  if (quantity > cartItem.product.stock) {
    throw new AppError("Requested quantity exceeds available stock.", 409);
  }

  const updatedItem = await prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity,
    },
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
        },
      },
    },
  });

  return {
    ...updatedItem,
    product: {
      ...updatedItem.product,
      price: Number(updatedItem.product.price),
    },
  };
};

export { listCartItems, addCartItems, updateCartItems };
