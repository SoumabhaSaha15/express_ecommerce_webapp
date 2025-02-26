import express from "express";
import clientAvatar from "./clientAvatar.js";
import productImages from "./productImages.js";
const router = express.Router();
router.route('/client-avatar/:id').get(clientAvatar);
router.route('/product-images/:productId/:id').get(productImages);
export default router;