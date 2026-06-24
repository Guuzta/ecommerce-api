import slugify from "slugify";

import { prisma } from "../lib/prisma.js";
import { Prisma } from "@prisma/client";

import AppError from "../utils/AppError.js";

import type { CreateProductBody } from "../schemas/productSchema.js";

import type { ListProductsResponse, Product } from "../types/product.js";

import {
  listProductsSchema,
  type ListProductsQuery,
} from "../schemas/listProductsSchema.js";
import type { GetProductParams } from "../schemas/getProductSchema.js";

const createProduct = async (data: CreateProductBody): Promise<Product> => {
  const { name, price, categoryId, description } = data;

  const categoryExists = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  const slug = slugify(name, {
    lower: true,
    strict: true,
  });

  const productExists = await prisma.product.findUnique({
    where: { slug },
  });

  if (productExists) {
    throw new AppError("Product already exists", 409);
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      categoryId,
    },

    select: {
      id: true,
      name: true,
      slug: true,
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

const listProducts = async (
  query: ListProductsQuery,
): Promise<ListProductsResponse> => {
  const { page, limit, search, category, sort } =
    listProductsSchema.parse(query);

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),

    ...(category && {
      category: {
        slug: category,
      },
    }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
        ? { price: "desc" }
        : sort === "name_asc"
          ? { name: "asc" }
          : { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    }),

    prisma.product.count({
      where,
    }),
  ]);

  const formattedProducts = products.map((product) => ({
    ...product,
    price: product.price.toNumber(),
  }));

  return {
    products: formattedProducts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getProductById = async (params: GetProductParams): Promise<Product> => {
  const { id } = params;

  const product = await prisma.product.findUnique({
    where: { id },
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

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return {
    ...product,
    price: Number(product.price),
  };
};

export { createProduct, listProducts, getProductById };
