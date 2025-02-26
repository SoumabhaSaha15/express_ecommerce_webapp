import express from "express";
import fs from "fs/promises";
import { ProductModel, ProductImagesModel } from "./../../../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = await ProductModel.find({ sellerId: req.body.sellerId });
    res.send(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
}