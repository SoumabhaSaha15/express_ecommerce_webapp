import fs from 'fs/promises';
import express from "express";
import { User } from "./../../../../models/index.js";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if(req.file === undefined) throw new Error('avatar is missing.')
    req.body = User.omit({ avatar: true }).parse(req.body);
    User.pick({ avatar: true }).parse({ avatar: await fs.readFile(req.file?.path || '') });
    next();
  } catch (err) {
    if(req.file?.path) await fs.unlink(req.file?.path);
    next((err as Error));
  }
}
