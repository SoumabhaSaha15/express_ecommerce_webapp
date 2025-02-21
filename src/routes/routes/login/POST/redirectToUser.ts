import express from "express";
export default async (req: express.Request, res: express.Response) => {
  res.redirect('/client/' + req.body?.id);
}
