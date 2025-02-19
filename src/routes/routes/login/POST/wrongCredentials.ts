import express from "express";
import * as bcrypt from 'bcrypt';
export default async (req: express.Request, _: express.Response, next: express.NextFunction) => {
  try {
    const hashResult = bcrypt.compareSync(req.body?.password || '', req.body?.hashPassword);
    if (!hashResult) throw new Error('Wrong email or password!!!');
    next();
  } catch (err) {
    next(err);
  }
}
