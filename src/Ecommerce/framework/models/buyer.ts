import mongoose, { Schema } from "mongoose";

const buyer = new Schema({
  uuid: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  money: { type: Number, require: true },
  shoppingCart: { type: Array, require: true },
  donate: { type: Array, require: true },
});

export default mongoose.model("Buyer", buyer);
