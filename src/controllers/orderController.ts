import type { Request, Response, NextFunction } from "express";

import * as orderService from "../services/orderService.js";

import type {
  CreateOrderResponse,
  GetOrderByIdResponse,
  ListOrderResponse,
} from "../types/order.js";

import type { GetIdParams } from "../schemas/idParamSchema.js";

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

const listOrders = async (
  req: Request,
  res: Response<ListOrderResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const orders = await orderService.listOrders(req.user!.sub);

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (
  req: Request<GetIdParams>,
  res: Response<GetOrderByIdResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const order = await orderService.getOrderById(req.user!.sub, req.params.id);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export { createOrder, listOrders, getOrderById };
