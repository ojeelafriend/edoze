import mongoose, { Schema } from "mongoose";

const product = new Schema(
  {
    uuid: { type: String, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    seller: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", product);
