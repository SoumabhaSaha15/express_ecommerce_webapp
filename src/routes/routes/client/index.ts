import error_handler from "./error.js";
import invalidParam from "./POST/invalidParam.js";
import express from "express";
const router = express.Router();
router
  .route('/client/:id')
  .get(invalidParam)
  .post(invalidParam);
router.use(error_handler);
export default router;