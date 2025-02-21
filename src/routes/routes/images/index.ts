import express from "express";
import clientAvatar from "./clientAvatar.js";
const router = express.Router();
router.route('/client-avatar/:id').get(clientAvatar);
export default router;