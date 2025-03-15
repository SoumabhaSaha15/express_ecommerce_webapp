import express from "express";
import { ClientModel } from "./../../../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const result = (await ClientModel.findById(req.params['id']))?.toJSON();
    if (result == null || !result.isSeller) throw new Error('Invalid seller!!!');
    else next();
  } catch (error) {
    next(error);
  }
};