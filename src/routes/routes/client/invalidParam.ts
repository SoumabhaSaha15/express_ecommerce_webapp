import express from "express";
import { ClientModel } from "../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try{
    const id = req.params['id'];
    const user = await ClientModel.findById(id).select(['isSeller', 'name', 'email']);
    if(!user) throw new Error('User not found');
    else res.render('seller/index',{...user.toJSON()});
  }catch(e){
    next(e);
  }
}