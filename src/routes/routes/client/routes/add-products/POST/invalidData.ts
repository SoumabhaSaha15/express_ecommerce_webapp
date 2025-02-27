import express from "express";
import fs from "fs";
import { Product, ProductModel, ProductImagesModel } from "./../../../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = Product.parse(req.body);
    const product = await ProductModel.create(data);
    (req.files as Express.Multer.File[]).forEach((file) => {
      ProductImagesModel.create({ image: fs.readFileSync(file.path), productId: product._id });
      fs.unlinkSync(file.path);
    });
    next();
  } catch (error) {
    next(error);
  }
}