import POST from "./POST/methods.js";
import error_handler from "./../signup/error.js";
import upload from "./../../../middleware/multer.js";
import express from "express";
const router = express.Router();
router
  .use(upload.single('avatar'))
  .route('/signup')
  .get(async (_: express.Request, res: express.Response) => res.render('signup/index'))
  .post(
    POST.invalidCredentials,
    POST.duplicateCredentialError,
    POST.setCookie
  );
router.use(error_handler);
export default router;