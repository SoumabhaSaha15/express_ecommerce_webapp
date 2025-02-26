import clientImage from "./routes/images/index.js";
import signup from "./routes/signup/index.js";
import login from "./routes/login/index.js";
import test from "./routes/test/index.js";
import client from "./routes/client/index.js";
import express from "express";
const router = express.Router();
router
  .get('/', async (_: express.Request, res: express.Response) => res.render('index'))
  .get('/home', async (_: express.Request, res: express.Response) => res.redirect('/'));
router
  .use(signup)
  .use(login)
  .use(test)
  .use(clientImage)
  .use(client);
export default router;