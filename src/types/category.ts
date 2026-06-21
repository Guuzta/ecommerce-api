export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
};

export type CategoryListItem = Pick<Category, "id" | "name" | "slug">;

export type CreateCategoryResponse = {
  message: string;
  category: Category;
};

export type ListCategoriesResponse = {
  categories: CategoryListItem[];
};
