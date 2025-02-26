import upload from "./../../../../../middleware/multer.js";
import express from "express";
import POST from "./POST/methods.js";
import error from './../../../client/error.js';
const router = express.Router();
import matchCookieAndParam from "./ALL/matchCookieAndParam.js";
import GET from './GET/methods.js'
router
  .route('/client/:id/add-products')
  .all(matchCookieAndParam)
  .get(GET.invalidParams,GET.redirectToPage)
  .post(upload.array('productImages',8), POST.invalidSeller, POST.invalidData, POST.productPage);
router.use(error);
export default router;