import express from "express";
import { ClientModel } from "../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await ClientModel.exists({ _id: req.query?.id }) ?
      next() :
      res.render('signup/error', { message: "No record found !!! Try clearing cookies." });
  } catch (err) {
    next(err);
  }
}
