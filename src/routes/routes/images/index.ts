import express from "express";
import userAvatar from "./userAvatar.js";
const router = express.Router();
router.route('/user-avatar/:id').get(userAvatar);
export default router;