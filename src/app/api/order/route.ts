import { connectionStrs } from "@/app/lib/db";
import { orderModel } from "@/app/lib/orderModel";
import { usersModel } from "@/app/lib/usersModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

mongoose.connect(connectionStrs);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    let order = new orderModel(data);
    const payload = await order.save();

    return NextResponse.json({
      payload,
      success: true,
      message: "Item Successfully Order",
    });
  } catch (err) {
    return NextResponse.json({
      messsage: "Internal Server Error",
      status: "500",
    });
  }
}
