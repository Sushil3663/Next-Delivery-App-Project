import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  foodItemsIds: Array<string>,
  resto_id: mongoose.Schema.Types.ObjectId,
  deliveryBoy_id: mongoose.Schema.Types.ObjectId,
  status: String,
  amount: String,
});

export const orderModel =
  mongoose.models.orders || mongoose.model("orders", orderSchema);
