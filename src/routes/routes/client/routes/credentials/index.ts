import express from "express";
import notLoggedInError from "./GET/notLoggedInError.js";
const router = express.Router();
router.route('/client/credentials').get(notLoggedInError);
export default router
