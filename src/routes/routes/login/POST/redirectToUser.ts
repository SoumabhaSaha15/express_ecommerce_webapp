import express from "express";
export default async (req: express.Request, res: express.Response) => {
  res.redirect('/user/' + req.body?.id);
}
