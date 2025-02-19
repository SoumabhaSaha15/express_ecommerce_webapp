import express from "express";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    req.cookies['id'] ? next() : res.render('login/index');
  } catch (err) {
    next(err);
  }
}
