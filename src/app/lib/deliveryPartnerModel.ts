import mongoose from "mongoose";

let deliverySchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      max: 20,
      min: 1,
    },
    phone: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
      max: 20,
      min: 2,
    },
    city: {
      type: "string",
      required: true,
    },
    address: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

export const deliveryModal =
  mongoose.models.deliverypartners ||
  mongoose.model("deliverypartners", deliverySchema);
