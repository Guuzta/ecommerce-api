export type Product = {
  id: string;
  name: string;
  slug: string;
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

export type ListProductsResponse = {
  products: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    category: {
      name: string;
      slug: string;
    };
  }[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type GetProductByIdResponse = {
  product: Product;
};
