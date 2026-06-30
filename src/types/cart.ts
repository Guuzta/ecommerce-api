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
