import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";
import { resturantModel } from "@/app/lib/resturantsModel";
import { connectionStrs } from "@/app/lib/db";
import { usersModel } from "@/app/lib/usersModel";

mongoose.connect(connectionStrs);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // console.log(data);
    let { email, password } = data;
    let emailExist = await usersModel.findOne({ email });

    if (emailExist) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 409 }
      );
    } else {
      const newUser = new usersModel(data);
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
