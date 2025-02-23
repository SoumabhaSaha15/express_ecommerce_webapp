import express from "express";
const router = express.Router();
import invalidParams from "./invalidParams.js";
router
  .route('/client/:id/add-products')
  .get(invalidParams);
export default router;