import { z } from "zod";
import mongoose from "mongoose";
export default z.strictObject({
  id: z.string().refine(id => mongoose.Types.ObjectId.isValid(id))
});