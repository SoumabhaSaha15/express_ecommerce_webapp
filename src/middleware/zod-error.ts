import { z } from "zod";
import express from "express";
export default <T extends z.ZodRawShape>(picked: z.ZodObject<T>) => {
  return async (req: express.Request, _: express.Response, next: express.NextFunction) => {
    let data = req.method === "GET" ? req.query : req.body;
    try {
      data = picked.parse(data);
      next();
    } catch (error) {
      next(error);
    }
  };
};