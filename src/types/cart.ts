export type ListCartItemsResponse = {
  cartId: string;
  items: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
    };
    subtotal: number;
  }[];
  total: number;
  totalItems: number;
};

export type UpdatedCartItemResponse = {
  quantity: number;
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
};
