import express from "express";
import { ClientModel } from "../../../../models/index.js";
export default async (req: express.Request, _: express.Response, next: express.NextFunction) => {
  try {
    let user = (await ClientModel.findOne({ email: req.body?.email }).exec());
    if (!user) throw new Error('No user found!!! Please signup first.');
    req.body = { id: user._id.toString(), hashPassword: user.password, password: req.body.password, isSeller: user.isSeller };
    next();
  } catch (err) {
    next(err);
  }

}
