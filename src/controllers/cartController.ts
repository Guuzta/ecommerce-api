import type { Request, Response, NextFunction } from "express";

import * as cartService from "../services/cartService.js";

import type { ListCartItemsResponse } from "../types/cart.js";

import type { AddCartItemsBody } from "../schemas/addCartItemsSchema.js";

const listCartItems = async (
  req: Request,
  res: Response<ListCartItemsResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const cartItems = await cartService.listCartItems(req.user!.sub);

    res.json(cartItems);
  } catch (error) {
    next(error);
  }
};

const addCartItems = async (
  req: Request<{}, {}, AddCartItemsBody>,
  res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> => {
  try {
    const message = await cartService.addCartItems(req.user!.sub, req.body);

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

export { listCartItems, addCartItems };
