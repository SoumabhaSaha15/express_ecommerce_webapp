import express from "express";
import fs from "fs/promises";
import jwt, { JwtPayload } from "jsonwebtoken";
import ejs from 'ejs';
import { ClientModel } from "./../../../../../../models/index.js";
import mongoose from "mongoose";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const cookie = req.cookies['id'];
    const decoded = jwt.verify(cookie, process.env.JWT_KEY) as JwtPayload;
    if (decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
      const data = (await ClientModel.findById(decoded.id))?.toJSON();
      if(data) res.send(ejs.render(await fs.readFile("./views/components/user-credential.ejs", "ascii"), data));
      else res.send(ejs.render(await fs.readFile("./views/components/credential-not-found.ejs","ascii"),{}));
    } else res.send(ejs.render(await fs.readFile("./views/components/credential-not-found.ejs","ascii"),{}));
  } catch (e) {
    next(e);
  }
}