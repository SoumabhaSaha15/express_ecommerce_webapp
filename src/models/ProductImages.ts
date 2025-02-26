import { Schema, model } from "mongoose";
export type ProductImages = {
  image: Buffer;
  productId: Schema.Types.ObjectId;
};
export const ProductImageSchema = new Schema<ProductImages>({
  image: {
    type: Buffer,
    require: [true, 'image is required.']
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Product Id is required.']
  }
}, {
  timestamps: true, toJSON: {
    versionKey: false, // Remove __v field
    transform: (_, ret): { image: string; productId: Schema.Types.ObjectId } => {
      ret.image = `http://localhost:${process.env.PORT}/product-images/${ret.productId}/${ret._id}.jpg`;
      return { image: ret.image, productId: ret.productId as Schema.Types.ObjectId };
    },
  }
});
export const ProductImagesModel = model<ProductImages>('product_image', ProductImageSchema);