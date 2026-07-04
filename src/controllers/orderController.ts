import type { Request, Response, NextFunction } from "express";

import * as orderService from "../services/orderService.js";

import type { CreateOrderResponse } from "../types/order.js";

const createOrder = async (
  req: Request,
  res: Response<CreateOrderResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const order = await orderService.createOrder(req.user!.sub);

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export { createOrder };
