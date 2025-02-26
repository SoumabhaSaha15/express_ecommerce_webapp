import express from "express";
import { ClientModel } from "../../../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = req.params['id'];
    const user = await ClientModel.findById(id).select(['name', 'email', 'isSeller']);
    if (!user) throw new Error('Seller not found');
    else {
      req.body = { ...user.toJSON() };
      next();
    }
  } catch (e) {
    next(e);
  }
}