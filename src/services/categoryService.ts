import slugify from "slugify";

import { prisma } from "../lib/prisma.js";

import AppError from "../utils/AppError.js";

import type { Category, CategoryListItem } from "../types/category.js";

const createCategory = async (name: string): Promise<Category> => {
  const categoryExists = await prisma.category.findUnique({ where: { name } });

  if (categoryExists) {
    throw new AppError("Category already exists", 409);
  }

  const slug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const category = await prisma.category.create({
    data: {
      name,
      slug,
    },
  });

  return category;
};

const listCategories = async (): Promise<CategoryListItem[]> => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },

    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return categories;
};

export { createCategory, listCategories };
