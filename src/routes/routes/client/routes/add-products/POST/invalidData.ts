import express from "express";
import fs from "fs/promises";
import { Product, ProductModel, ProductImagesModel } from "./../../../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = Product.parse(req.body);
    const product = await ProductModel.create(data);
    (req.files as Express.Multer.File[]).forEach(async (file) => {
      await ProductImagesModel.create({ image: await fs.readFile(file.path), productId: product._id });
      await fs.unlink(file.path);
    })
    next();
  } catch (error) {
    next(error);
  }
}