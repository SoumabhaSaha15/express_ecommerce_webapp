import express from "express";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.redirect(`/client/${req.body.sellerId}/view-products`);
  } catch (error) {
    next(error);
  }
}