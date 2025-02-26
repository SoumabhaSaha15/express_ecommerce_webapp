import fs from "fs/promises";
import express from "express";
import { ProductImagesModel } from "./../../../models/index.js";
export default async (req: express.Request, res: express.Response) => {
  try {
    const [id, extension] = req.params['id'].split("."), validExt = ["jpg", "jpeg", "png"];
    const productId = req.params['productId'];
    const productImage = await ProductImagesModel.findOne({'_id':id,'productId':productId});
    if (productImage?.image == null || productImage == null) throw new Error('product Not found!!!');
    else if (!validExt.includes(extension)) throw new Error('Invalid extension!!!');
    else {
      res.setHeader('Content-Type', `image/${extension}`);
      res.send(Buffer.from(productImage.image.toString('base64'), "base64url"));
    }
  } catch (err) {
    res.setHeader('Content-Type', `image/jpg`);
    const [_, extension] = req.params['id'].split(".");
    if (extension == 'jpg') res.send(await fs.readFile('./public/assets/not-found.jpg'));
    else res.redirect('/assets/not-found.jpg');
  }
};