import express from "express";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.render('seller/products', { products: req.body, isSeller: true });
  } catch (error) {
    next(error);
  }
}