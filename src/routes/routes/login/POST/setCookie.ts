import express from "express";
import jwt from 'jsonwebtoken';
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const TenYearsFromNow = new Date();
    TenYearsFromNow.setFullYear(TenYearsFromNow.getFullYear() + 10);
    res.cookie('id', jwt.sign({ id: req.body?.id }, process.env.JWT_KEY), {
      httpOnly: true,
      expires: TenYearsFromNow,
    });
    next();
  } catch (err) {
    next(err);
  }
}
