import express from "express";
import jwt from "jsonwebtoken";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const TenYearsFromNow = new Date();
    TenYearsFromNow.setFullYear(TenYearsFromNow.getFullYear() + 10);
    res.cookie('id', jwt.sign({ id: req.body.id }, process.env.JWT_KEY as string), {
      httpOnly: true,
      expires: TenYearsFromNow
    });
    res.cookie('isSeller', jwt.sign({ isSeller: req.body.isSeller }, process.env.JWT_KEY as string), {
      httpOnly: true,
      expires: TenYearsFromNow
    });
    res.redirect(`/client/${req.body.id}`);
  } catch (err) {
    next(new Error((err as Error).message));
  }
}