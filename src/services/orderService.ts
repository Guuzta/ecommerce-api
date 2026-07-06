import { prisma } from "../lib/prisma.js";

import AppError from "../utils/AppError.js";

import type { CreateOrderResponse, ListOrderResponse } from "../types/order.js";

const createOrder = async (userId: string): Promise<CreateOrderResponse> => {
  const cart = await prisma.cart.findUnique({
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
    throw new AppError("Cart not found", 404);
  }

  if (cart.cartItems.length === 0) {
    throw new AppError("Cannot create an order with any empty cart", 422);
  }

  cart.cartItems.forEach((cartItem) => {
    if (cartItem.quantity > cartItem.product.stock) {
      throw new AppError("Requested quantity exceeds available stock", 403);
    }
  });

  const orderId = await prisma.$transaction(async (tx) => {
    const total = cart.cartItems.reduce((acc, item) => {
      return acc + item.quantity * Number(item.product.price);
    }, 0);

    const order = await tx.order.create({
      data: {
        userId,
        total,
      },
    });

    const orderItems = cart.cartItems.map((cartItem) => {
      return {
        orderId: order.id,
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
        unitPrice: cartItem.product.price,
        subtotal: cartItem.quantity * Number(cartItem.product.price),
      };
    });

    await tx.orderItem.createMany({
      data: orderItems,
    });

    for (const cartItem of cart.cartItems) {
      await tx.product.update({
        where: {
          id: cartItem.productId,
        },
        data: {
          stock: {
            decrement: cartItem.quantity,
          },
        },
      });
    }

    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return order.id;
  });

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      status: true,
      total: true,
      createdAt: true,

      orderItems: {
        select: {
          id: true,
          quantity: true,
          unitPrice: true,
          subtotal: true,

          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  const formattedOrder = {
    ...order,
    total: Number(order.total),
    orderItems: order.orderItems.map((item) => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      subtotal: Number(item.subtotal),
    })),
  };

  return {
    order: formattedOrder,
  };
};

const listOrders = async (userId: string): Promise<ListOrderResponse> => {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      status: true,
      total: true,
      createdAt: true,

      orderItems: {
        select: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const formattedOrder = orders.map((order) => ({
    ...order,
    total: Number(order.total),
  }));

  return {
    orders: formattedOrder,
  };
};

export { createOrder, listOrders };
