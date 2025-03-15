import z from "zod";
import express from "express";
import { ProductModel, } from "./../../../../../../models/index.js";
import mongoose from "mongoose";
export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  try {
    const result = await ProductModel.aggregate([
      { $match: { "sellerId": new mongoose.Types.ObjectId(req.params['id']) } },
      {
        $lookup: {
          from: "product_images",
          localField: "_id",
          foreignField: "productId",
          as: "images"
        }
      },
      {
        $project: {
          brandName: 1,
          details: 1,
          description: 1,
          price: 1,
          images: {
            $map: {
              input: "$images",
              as: "img",
              in: {
                $concat: [
                  "http://localhost:3000/product-images/",
                  { $toString: "$_id" },
                  "/",
                  { $toString: "$$img._id" },
                  ".jpg"
                ]
              }
            }
          }
        }
      }
    ]);

    const dataParser = z.array(z.strictObject({
      _id: z.instanceof(mongoose.Types.ObjectId),
      images: z.array(z.string().url()).nonempty(),
      brandName: z
        .string({ required_error: 'brand name is required' })
        .min(4, 'brand name must have 4 or more chars')
        .max(40, 'brand name must be under 30 chars')
        .regex(/^[\x00-\x7F]+$/, 'invalid brand name'),
      description: z
        .string({ required_error: 'description is required' })
        .regex(/^[\x00-\x7F]+$/, 'invalid description'),
      details: z
        .string({ required_error: 'password is required' })
        .regex(/^[\x00-\x7F]+$/, 'invalid description'),
      price: z.coerce.number()
    }));

    const data = dataParser.parse(result);
    req.body = data;
    next();
  } catch (error) {
    next(error);
  }
}