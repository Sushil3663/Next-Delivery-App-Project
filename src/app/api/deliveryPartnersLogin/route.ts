import DeliveryPartner from "@/app/deliveryPartner/page";
import { connectionStrs } from "@/app/lib/db";
import { deliveryModal } from "@/app/lib/deliveryPartnerModel";
import { usersModel } from "@/app/lib/usersModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

mongoose.connect(connectionStrs);

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    let { phone, password } = payload;
    // console.log(email);
    if (phone && password) {
      const payload = await deliveryModal.findOne({
        phone: phone,
        password: password,
      });
      console.log(payload);
      return NextResponse.json({
        payload,
        success: true,
        message: "Successfully Login",
      });
    } else {
      return NextResponse.json({ result: "Email doesn't Exist", alert: false });
    }
  } catch (err) {
    return NextResponse.json({
      messsage: "Internal Server Error",
      status: "500",
    });
  }
}
