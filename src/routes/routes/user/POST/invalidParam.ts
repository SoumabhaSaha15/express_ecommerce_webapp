import express from "express";
import { UserModel } from "../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try{
    const id = req.params['id'];
    const user = await UserModel.findById(id).select(['avatar', 'name', 'email']);
    if(!user) throw new Error('User not found');
    else res.render('user/index',{...user.toJSON()});
  }catch(e){
    next(e);
  }
}