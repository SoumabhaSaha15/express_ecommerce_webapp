import fs from "fs/promises";
import express from "express";
import { UserModel } from "./../../../models/index.js";

export default async (req: express.Request, res: express.Response) => {
  try {
    const [id, extension] = req.params['id'].split("."), validExt = ["jpg", "jpeg", "png"];
    const user = await UserModel.findById(id).select({ avatar: true }).lean();
    if (user?.avatar == null) throw new Error('User Not found!!!');
    else if (!validExt.includes(extension)) throw new Error('Invalid extension!!!');
    else {
      res.setHeader('Content-Type', `image/${extension}`);
      res.send(Buffer.from(user.avatar.toString('base64'), "base64url"));
    }
  } catch (err) {
    res.setHeader('Content-Type', `image/jpg`);
    const [_, extension] = req.params['id'].split(".");
    if (extension == 'jpg') res.send(await fs.readFile('./public/assets/not-found.jpg'));
    else res.redirect('/assets/not-found.jpg');
  }
};