import error_handler from "./../user/error.js";
import invalidParam from "./../user/POST/invalidParam.js";
import express from "express";
const router = express.Router();
router
  .route('/client/:id')
  .get(invalidParam)
  .post(invalidParam);
router.use(error_handler);
export default router;