import { z } from "zod";
import mongoose, { Schema, model } from "mongoose";
export const Product = z.strictObject({
  brandName: z
    .string({ required_error: 'brand name is required' })
    .min(4, 'name must have 4 or more chars')
    .max(40, 'name must be under 30 chars')
    .regex(/^[\x00-\x7F]+$/, 'invalid brand name'),
  description: z
    .string({ required_error: 'description is required' })
    .regex(/^[\x00-\x7F]+$/, 'invalid description'),
  details: z
    .string({ required_error: 'password is required' })
    .regex(/^[\x00-\x7F]+$/, 'invalid description'),
});
export type ProductDoc = z.infer<typeof Product> & {
  sellerId: mongoose.Types.ObjectId,
};
export const ProductSchema = new Schema<ProductDoc>({
  brandName: {
    type: String,
    required: [true, 'brand name is required.'],
    validate: {
      validator: (value) => Product.pick({ brandName: true }).safeParse(value).success,
      message: (props: { value: string; }) => `${props.value} is not a valid brand name.`
    }
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    validate: {
      validator: (value) => Product.pick({ description: true }).safeParse(value).success,
      message: (props: { value: string; }) => `${props.value} is not a valid description.`
    }
  },
  details: {
    type: String,
    required: [true, 'details is required'],
    validate: {
      validator: (value) => Product.pick({ details: true }).safeParse(value).success,
      message: (props: { value: string; }) => `${props.value} is not a valid details.`
    }
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client_model",
    required: [true, "sellerId is required."]
  }
}, { timestamps: true });
export const ProductModel = model<ProductDoc>('product_model', ProductSchema); 