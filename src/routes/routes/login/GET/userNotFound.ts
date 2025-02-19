import express from "express";
import { UserModel } from "../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await UserModel.exists({ _id: req.query?.id }) ?
      next() :
      res.render('signup/error', { message: "No user found !!! Try clearing cookies." });
  } catch (err) {
    next(err);
  }
}
