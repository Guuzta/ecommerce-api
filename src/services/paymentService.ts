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

export { pay };
