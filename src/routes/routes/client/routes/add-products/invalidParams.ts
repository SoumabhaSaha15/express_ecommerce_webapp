import express from "express";
import { ClientModel } from "../../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try{
    const id = req.params['id'];
    const user = await ClientModel.findById(id).select(['name', 'email','isSeller']);
    if(!user) throw new Error('Seller not found');
    else res.render('seller/add-products/index',{...user.toJSON()});
  }catch(e){
    next(e);
  }
}