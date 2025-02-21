import fs from "fs/promises";
import express from "express";
import { ClientModel } from "../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.file?.path) {
      const { _id, isSeller } = await ClientModel.create({ ...req.body, avatar: await fs.readFile(req.file.path) });
      await fs.unlink(req.file.path);
      req.body = { "id": _id, isSeller: isSeller };
    } else throw new Error('avatar is missing!!!');
    next();
  } catch (err) {
    if (req.file?.path) await fs.unlink(req.file.path);
    next(err);
  }
}