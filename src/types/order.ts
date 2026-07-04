export type CreateOrderResponse = {
  order: {
    id: string;
    status: string;
    total: number;
    createdAt: Date;
    orderItems: {
      id: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
      product: {
        id: string;
        name: string;
      };
    }[];
  };
};
