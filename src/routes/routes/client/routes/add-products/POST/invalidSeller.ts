import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ClientModel } from "./../../../../../../models/index.js";
import ObjectId from "./../../../../../../validators/ObjectId.js";
import mongoose from "mongoose";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let payload = jwt.verify(req.cookies['id'] || "", process.env.JWT_KEY) as JwtPayload;
    if (payload?.iat) delete payload['iat'];
    payload = ObjectId.parse(payload);
    let doc = await ClientModel.findById(payload.id).select(['isSeller']);
    if (doc?.isSeller == false) throw new Error("You are not a seller.");
    else req.body = { ...req.body, sellerId: new mongoose.Types.ObjectId(payload.id) }
    next();
  } catch (error) {
    next(error);
  }
}