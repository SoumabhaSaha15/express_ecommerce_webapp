import express from "express";
import { Client } from "../../../../models/index.js";
import zodError from "../../../../middleware/zod-error.js";
const loginParser = Client.pick({ password:true,email:true });
export default zodError(loginParser);
