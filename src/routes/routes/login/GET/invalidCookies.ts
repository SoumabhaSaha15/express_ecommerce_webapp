import express from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import ObjectId from "../../../../validators/ObjectId.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let payload: string | JwtPayload = jwt.verify(req.cookies['id'] || '', process.env.JWT_KEY);
    if ((payload as JwtPayload)['iat']) delete (payload as JwtPayload)['iat'];
    const { success, data } = ObjectId.safeParse(payload as JwtPayload);
    success ? (() => {
      req.query = data;
      next();
    })() : res.render('login/index');
  } catch (err) {
    next(err);
  }
}
