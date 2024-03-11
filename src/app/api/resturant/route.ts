import { NextResponse } from "next/server";

import mongoose from "mongoose";
import { resturantModel } from "@/app/lib/resturantsModel";
import { connectionStrs } from "@/app/lib/db";

mongoose.connect(connectionStrs);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // console.log(data);
    let { email, password } = data;
    let emailExist = await resturantModel.findOne({ email });

    if (emailExist) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 409 }
      );
    } else {
      // let salt = bcrypt.genSaltSync(10);
      // let hashPassword = bcrypt.hashSync(password, salt);

      const newResturant = new resturantModel(data);
      let payload = await newResturant.save();

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
