import error_handler from "./error.js";
import credential from "./routes/credentials/index.js";
import invalidParam from "./invalidParam.js";
import addProducts from "./routes/add-products/index.js";
import express from "express";
const router = express.Router();
router.use(credential);
router
  .route('/client/:id')
  .get(invalidParam)
  .post(invalidParam);
router.use(addProducts);
router.use(error_handler);
export default router;