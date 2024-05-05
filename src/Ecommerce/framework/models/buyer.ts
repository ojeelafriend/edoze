import mongoose, { Schema } from "mongoose";

const cart = new Schema(
  {
    productId: { type: String, require: true },
  },
  { timestamps: true }
);

const buyer = new Schema({
  uuid: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  shoppingCart: { type: [cart] },
  gift: { type: [cart] },
});

export default mongoose.model("Buyer", buyer);
