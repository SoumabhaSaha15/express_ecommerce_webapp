import { ProductImagesModel } from "./ProductImages.js";
import { z } from "zod";
import mongoose, { Schema, model } from "mongoose";
export const Product = z.strictObject({
  brandName: z
    .string({ required_error: 'brand name is required' })
    .min(4, 'name must have 4 or more chars')
    .max(40, 'name must be under 30 chars')
    .regex(/^[\x00-\x7F]+$/, 'invalid brand name'),
  catagory: z
    .enum([
      'Electronics',
      'Mens-Fashion',
      'Womens-Fashion',
      'Beauty & Personal Care',
      'Home & Furniture',
      'Grocery & Essentials',
      'Toys & Baby Products',
      'Books & Stationery',
      'Pet Supplies'
    ],
      { required_error: "catagory must be provided!!!" }
    )
  ,
  description: z
    .string({ required_error: 'description is required' })
    .regex(/^[\x00-\x7F]+$/, 'invalid description'),
  details: z
    .string({ required_error: 'details is required' })
    .regex(/^[\x00-\x7F]+$/, 'invalid details')
    .refine((value) => {
      /** 
       * checking plain JSON [no nested is allowed!!!] 
      */
      try {
        let object = JSON.parse(value);
        for (const key in object) if (typeof object[key] === 'object') return false;
        return true;
      } catch (error) {
        return false;
      }
    },{message:'not a valid json string or any nested object is given!!'}),
  quantity: z.coerce.number({ required_error: 'quantity is required' }).int().positive().min(10),
  sellerId: z.instanceof(mongoose.Types.ObjectId),
  price: z.coerce.number().int().positive().min(50),
});
export type ProductType = z.infer<typeof Product>
export const ProductSchema = new Schema<ProductType>({
  brandName: {
    type: String,
    required: [true, 'brand name is required.'],
    validate: {
      validator: (value) => Product.pick({ brandName: true }).safeParse({ brandName: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid brand name.`
    }
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    validate: {
      validator: (value) => Product.pick({ description: true }).safeParse({ description: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid description.`
    }
  },
  catagory: {
    type: String,
    validate: {
      validator: (v) => Product.pick({ catagory: true }).safeParse({ catagory: v }).success,
      message: (prop: { value: string; }) => `${prop.value} is not a valid catagory`
    }
  },
  details: {
    type: String,
    required: [true, 'details is required'],
    validate: {
      validator: (value) => Product.pick({ details: true }).safeParse({ details: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid details.`
    }
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: "client_model",
    required: [true, "sellerId is required."]
  },
  quantity: {
    type: Number,
    required: [true, 'quantity must be provided'],
    validate: {
      validator: (v) => Product.pick({ quantity: true }).safeParse({ quantity: v }).success,
      message: (prop: { value: string; }) => `${prop.value} is not a valid quantity.`
    }
  },
  price: {
    type: Number,
    required: [true, "price can't be empty"],
    validate: {
      validator: value => Product.pick({ price: true }).safeParse({ price: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid price.`
    }
  }
}, { timestamps: true });

ProductSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
  const product_id = this.getFilter()._id;
  //console.log(product_id);
  const result = await ProductImagesModel.deleteMany({ productId: product_id });
  //console.log(result);
  next();
});

export const ProductModel = model<ProductType>('product_model', ProductSchema); 