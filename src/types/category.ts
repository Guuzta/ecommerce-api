export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
};

export type CreateCategoryResponse = {
  message: string;
  category: Category;
};
