export type Order = {
  id: string;
  status: "PENDING" | "PAID" | "CANCELLED";
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
  };
};

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

export type ListOrderResponse = {
  orders: {
    id: string;
    status: Order["status"];
    total: number;
    createdAt: Date;
    orderItems: {
      product: {
        name: string;
      };
    }[];
  }[];
};
