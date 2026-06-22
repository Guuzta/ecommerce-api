import { prisma } from "../lib/prisma.js";

import AppError from "../utils/AppError.js";

import type { CreateProductBody } from "../schemas/productSchema.js";

import type { Product } from "../types/product.js";

const createProduct = async (data: CreateProductBody): Promise<Product> => {
  const { name, price, categoryId, description } = data;

  const categoryExists = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId,
    },

    select: {
      id: true,
      name: true,
      description: true,
      price: true,

      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return {
    ...product,
    price: Number(product.price),
  };
};

export { createProduct };
