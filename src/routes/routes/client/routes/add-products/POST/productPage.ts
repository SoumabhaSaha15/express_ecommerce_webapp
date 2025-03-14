import express from "express";
import { ProductModel, ProductImagesModel, ClientModel } from "./../../../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let data = (await ProductModel.find({ sellerId: req.body.sellerId })).map(v => v.toJSON());
    for (let index = 0; index < data.length; index++) {
      //@ts-ignore
      data[index].images = ((await ProductImagesModel.find({ productId: data[index]._id })).map(v => v.toJSON().image));
    }
    //pending correction
    res.render('seller/products', {products: data, isSeller: true });
  } catch (error) {
    next(error);
  }
}