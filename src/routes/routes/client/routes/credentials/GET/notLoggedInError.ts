import express from "express";
import fs from "fs/promises";
import jwt, { JwtPayload } from "jsonwebtoken";
import ejs from 'ejs';
import { ClientModel } from "./../../../../../../models/index.js";
import mongoose from "mongoose";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errorResponse = `
  <button class="btn btn-square btn-ghost">
    <div class="avatar">
      <div class="w-8 rounded-full">
        <img src="/assets/not-found.jpg" class="rounded-full bg-base-300" alt="can't find avatar" />
      </div>
    </div>
  </button>
  <ul tabindex="0" class="dropdown-content menu z-[1] w-96 rounded-box bg-base-300 p-2 shadow">
    <li class="card rounded-box w-full max-w-sm shadow-2xl bg-base-100">
      <figure class="px-10 pt-10">
        <img src="/assets/not-found.jpg" alt="can't find avatar" class="h-24 w-24 rounded-full bg-base-200" />
      </figure>
      <div class="card-body items-center text-center overflow-hidden text-ellipsis">
        <h2 class="card-title">
          can't find name
        </h2>
        <p>
          can't find email
        </p>
      </div>
    </li>
  </ul>
  `;
  try {
    const cookie = req.cookies['id'];
    const decoded = jwt.verify(cookie, process.env.JWT_KEY) as JwtPayload;
    if (decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
      const data = (await ClientModel.findById(decoded.id))?.toJSON();
      if(data) res.send(ejs.render(await fs.readFile("./views/components/user-credential.ejs", "ascii"), data));
      else res.send(errorResponse);
    } else res.send(errorResponse);
  } catch (e) {
    next(e);
  }
}