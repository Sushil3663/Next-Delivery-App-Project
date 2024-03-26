import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStrs } from "@/app/lib/db";
import { FoodModel } from "@/app/lib/foodsModel";

mongoose.connect(connectionStrs);
export async function POST(request: Request, response: Response) {
  try {
    const data = await request.json();
    const { foodname, price, path, desc, resto_id } = data;

    const food = new FoodModel({ foodname, price, path, desc, resto_id });
    const payload = await food.save();
    return NextResponse.json({
      payload,
      success: true,
      message: "Successful",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { result: "Internal Server Error" },
      { status: 500 }
    );
  }
}
