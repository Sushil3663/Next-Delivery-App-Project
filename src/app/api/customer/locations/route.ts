import { NextResponse } from "next/server";

import mongoose from "mongoose";
import { resturantModel } from "@/app/lib/resturantsModel";
import { connectionStrs } from "@/app/lib/db";

mongoose.connect(connectionStrs);

export async function GET(request: Request) {
  try {
    // const sity = await request.json();
    // console.log(data);
    let result = await resturantModel.find();
    result = result.map((item) => item?.city.toUpperCase());
    console.log(result);

    let payload = result.filter(
      (item, index) => result.indexOf(item) === index
    );
    console.log(payload);
    return NextResponse.json({
      payload,
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error" },
      { status: 500 }
    );
  }
}
