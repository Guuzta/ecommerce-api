import type { Request, Response, NextFunction } from "express";

import * as paymentService from "../services/paymentService.js";

import type { PayResponse } from "../types/payment.js";

import type { GetIdParams } from "../schemas/idParamSchema.js";

const pay = async (
  req: Request<GetIdParams>,
  res: Response<PayResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const payment = await paymentService.pay(req.params.id, req.user!.sub);

    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

const cancel = async (
  req: Request<GetIdParams>,
  res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> => {
  try {
    const message = await paymentService.cancel(req.params.id, req.user!.sub)

    res.status(200).json(message)
  } catch (error) {
    next(error)
  }
};

export { pay, cancel };
