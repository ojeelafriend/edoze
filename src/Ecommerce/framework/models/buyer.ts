import mongoose, { Schema } from 'mongoose';

const item = new Schema(
  {
    productId: { type: String, require: true },
  },
  { timestamps: true }
);

const buyer = new Schema({
  uuid: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  money: { type: Number, require: true },
  shoppingCart: [item],
  donate: [item],
});

export default mongoose.model('Buyer', buyer);
