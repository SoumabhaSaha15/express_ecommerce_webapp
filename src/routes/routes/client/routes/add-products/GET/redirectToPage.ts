import express from "express";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.render('seller/add-products/index',req.body);
  } catch (e) {
    next(e);
  }
}