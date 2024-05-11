import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      max: 20,
      min: 1,
    },
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

export const usersModel =
  mongoose.models.users || mongoose.model("users", userSchema);
