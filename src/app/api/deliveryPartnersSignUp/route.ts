import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";
import { connectionStrs } from "@/app/lib/db";
import { deliveryModal } from "@/app/lib/deliveryPartnerModel";

mongoose.connect(connectionStrs);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // console.log(data);
    let { phone, password } = data;
    let phoneExist = await deliveryModal.findOne({ phone });
    let passwordExist = await deliveryModal.findOne({ password });

    if (phoneExist && passwordExist) {
      return NextResponse.json(
        { message: "Credential already exist" },
        { status: 409 }
      );
    } else {
      const newUser = new deliveryModal(data);
      let payload = await newUser.save();

      return NextResponse.json({
        payload,
        success: true,
        message: "Successfully Registered",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error" },
      { status: 500 }
    );
  }
}
