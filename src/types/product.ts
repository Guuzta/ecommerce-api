export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: {
    name: string;
    id: string;
    slug: string;
  };
};

export type CreateProductResponse = {
  message: string;
  product: Product;
};
