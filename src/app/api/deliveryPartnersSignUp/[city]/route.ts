import { NextApiResponse, NextApiRequest } from "next";
import mongoose from "mongoose";
import { connectionStrs } from "@/app/lib/db";
import { FoodModel } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";
import { deliveryModal } from "@/app/lib/deliveryPartnerModel";

mongoose.connect(connectionStrs);
export async function GET(req: NextApiRequest, content: any) {
  try {
    const city: any = content.params.city;
    // console.log(city);
    let filter = { city: { $regex: new RegExp(city, "i") } };
    let payload = await deliveryModal.find(filter);
    // console.log(payload);
    return NextResponse.json({
      payload,
      success: true,
      message: "User Get Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
