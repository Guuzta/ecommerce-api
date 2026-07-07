import { PaymentStatus } from "@prisma/client";

export type PayResponse = {
  payment: {
    id: string;
    orderId: string;
    amount: number;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
  };
};
