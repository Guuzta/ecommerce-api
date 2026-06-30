import type { Request, Response, NextFunction } from "express";

import * as cartService from "../services/cartService.js";

import type { ListCartItemsResponse } from "../types/cart.js";

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

export { listCartItems };
