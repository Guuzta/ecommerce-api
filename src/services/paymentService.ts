import { prisma } from "../lib/prisma.js";
import type { PayResponse } from "../types/payment.js";

import AppError from "../utils/AppError.js";

const pay = async (orderId: string, userId: string): Promise<PayResponse> => {
  const payment = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.status !== "PENDING") {
      throw new AppError("Order cannot be paid", 409);
    }

    const payment = await tx.payment.create({
      data: {
        orderId,
        amount: order.total,
        status: "APPROVED",
      },
    });

    await tx.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "PAID",
      },
    });

    return payment;
  });

  const formattedPayment = {
    ...payment,
    amount: Number(payment.amount),
  };

  return {
    payment: formattedPayment,
  };
};

const cancel = async (orderId: string, userId: string): Promise<any> => {
  const order = await prisma.order.findUnique({
    where: { id: orderId, userId },
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  const payment = await prisma.payment.findUnique({
    where: { orderId },
    include: {
      order: {
        include: {
          orderItems: true,
        },
      },
    },
  });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  if (payment.status !== "APPROVED") {
    throw new AppError("Payment cannot be canceled", 409);
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "CANCELLED",
      },
    });

    await tx.order.update({
      where: { id: payment.orderId },
      data: {
        status: "CANCELLED",
      },
    });

    for (const orderItem of payment.order.orderItems) {
      await tx.product.update({
        where: {
          id: orderItem.id,
        },
        data: {
          stock: {
            increment: orderItem.quantity,
          },
        },
      });
    }
  });
};

export { pay, cancel };
