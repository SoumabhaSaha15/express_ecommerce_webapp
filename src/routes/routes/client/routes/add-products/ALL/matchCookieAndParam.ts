import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const param = req.params['id'];
    const cookie = req.cookies['id'];
    if (param == null || cookie == null) throw new Error('Invalid cookies or param!!!');
    const decoded = jwt.verify(cookie, process.env.JWT_KEY) as JwtPayload;
    if (decoded.id && decoded.id === param) next();
    else throw new Error('Invalid cookies!!!');
  } catch (e) {
    next(e);
  }
}