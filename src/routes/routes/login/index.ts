import POST from "./POST/methods.js";
import GET from "./GET/methods.js";
import error from "./error.js";
import express from "express";
const router = express.Router();
router
  .route('/login')
  .get(
    GET.cookiesNotFound,
    GET.invalidCookies,
    GET.userNotFound,
    GET.redirectToUser
  )
  .post(
    POST.invalidLoginCredentials,
    POST.userNotFound,
    POST.wrongCredentials,
    POST.setCookie,
    POST.redirectToUser
  );
router.use(error);
export default router;