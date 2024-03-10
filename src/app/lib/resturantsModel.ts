import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema(
  {
    email: {
      type: "string",
      required: true,
      max: 20,
      min: 2,
    },
    password: {
      type: "string",
      required: true,
      max: 20,
      min: 2,
    },
    rname: {
      type: "string",
      required: true,
      max: 20,
      min: 1,
    },
    city: {
      type: "string",
      required: true,
    },
    address: {
      type: "string",
      required: true,
    },
    phone: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

export const resturantModel =
  mongoose.models.resturants || mongoose.model("resturants", resturantSchema);
