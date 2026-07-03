import type { Request, Response, NextFunction } from "express";

import * as cartService from "../services/cartService.js";

import type {
  ListCartItemsResponse,
  UpdatedCartItemResponse,
} from "../types/cart.js";

import type { AddCartItemsBody } from "../schemas/addCartItemsSchema.js";
import type { UpdateCartItemsBody } from "../schemas/updateCartItemsSchema.js";
import type { GetIdParams } from "../schemas/idParamSchema.js";

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

const updateCartItems = async (
  req: Request<GetIdParams, {}, UpdateCartItemsBody>,
  res: Response<UpdatedCartItemResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const updatedItem = await cartService.updateCartItems(
      req.user!.sub,
      req.params.id,
      req.body,
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

const deleteCartItems = async (
  req: Request<GetIdParams>,
  res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> => {
  try {
    const message = await cartService.deleteCartItems(
      req.user!.sub,
      req.params.id,
    );

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export { listCartItems, addCartItems, updateCartItems, deleteCartItems };
