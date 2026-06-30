import { prisma } from "../lib/prisma.js";

import type { ListCartItemsResponse } from "../types/cart.js";

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

export { listCartItems };
