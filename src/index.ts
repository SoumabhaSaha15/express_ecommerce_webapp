import cookie_parser from "cookie-parser";
import layout from "express-ejs-layouts";
import { GridFSBucket } from "mongodb";
import router from "./routes/index.js";
import error from "./routes/error.js";
import { print } from "running-at";
import { connect } from "mongoose";
import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import path from "path";

try {
  dotenv.config();
  const CONNECTOR = await connect(process.env.DB_URI);
  const DB = CONNECTOR.connection.db;
  const GFSB = DB ? new GridFSBucket(DB, { bucketName: process.env.GFSB_SRC }) : null;
  if (!GFSB) throw new Error('Failed to init GridFSBucket');
  const APP = express()
    .set("view engine", "ejs")
    .set("views", path.join(import.meta.dirname, "./../views"))
    .use(express.static(path.join(import.meta.dirname, "./../public")))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookie_parser())
    .use(async (req: express.Request, _: express.Response, next: express.NextFunction) => {
      req.GFSB = GFSB; //Centralizing GridFSBucket.
      next();
    })
    .use(layout)
    .use(router)
    .use(error)
    .listen(process.env.PORT, () => print(process.env.PORT));
    
  process.on("unhandledRejection", (reason) => {
    console.log(chalk.red.bold("Unhandled Rejection:"), '\n', reason);
  });
  //Graceful shutdown.
  process.on("SIGINT", async () => {
    console.log(chalk.yellow.bold("Server closed. MongoDB disconnected."));
    await CONNECTOR.disconnect();
    APP.close(async (error) => {
      if (error) console.log(chalk.red.bold(error.message || "Error during server shutdown."));
      process.exit(0);
    });
  });
} catch (error) {
  console.log(chalk.red.bold((error as Error).message));
}