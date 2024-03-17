import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodname: {
      type: "string",
      required: true,
    },
    price: {
      type: "number",
      required: true,
    },
    path: {
      type: "string",
      required: true,
    },
    desc: {
      type: "string",
      required: true,
    },

    resto_id: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export const resturantModel =
  mongoose.models.foods || mongoose.model("foods", foodSchema);
