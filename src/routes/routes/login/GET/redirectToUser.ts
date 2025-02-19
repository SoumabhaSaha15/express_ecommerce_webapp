import express from "express";
import { UserModel } from "../../../../models/index.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
export default async (req: express.Request, res: express.Response) => {
  res.redirect('/user/' + req.query.id);
}
