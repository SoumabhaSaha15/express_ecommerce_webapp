import express from "express";
import { User } from "../../../../models/index.js";
import zodError from "../../../../middleware/zod-error.js";
const loginParser = User.omit({ name: true, avatar: true });
export default zodError(loginParser);
