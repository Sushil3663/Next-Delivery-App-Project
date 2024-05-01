import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";
import { resturantModel } from "@/app/lib/resturantsModel";
import { connectionStrs } from "@/app/lib/db";

mongoose.connect(connectionStrs);

export async function GET(request: NextRequest) {
  try {
    let queryParams = request.nextUrl.searchParams;
    console.log(queryParams.get("location"));

    if (queryParams.get("resturant") && queryParams.get("location")) {
      let resturant = queryParams.get("resturant");
      let location = queryParams.get("location");
      if (resturant && location) {
        let resturantPayload = await resturantModel.find({
          rname: { $regex: new RegExp(resturant, "i") },
        });

        let locationPayload = await resturantModel.find({
          city: { $regex: new RegExp(location, "i") },
        });

        let combinedPayload = [...resturantPayload, ...locationPayload];

        return NextResponse.json({
          payload: combinedPayload,
          success: true,
          message: "Successfully",
        });
      }
    } else if (queryParams.get("resturant")) {
      console.log(queryParams.get("resturant"));

      let resturant = queryParams.get("resturant");
      if (resturant) {
        let payload = await resturantModel.find({
          rname: { $regex: new RegExp(resturant, "i") },
        });
        return NextResponse.json({
          payload,
          success: true,
          message: "Successfully",
        });
      }
    } else if (queryParams.get("location")) {
      console.log(queryParams.get("location"));
      let location = queryParams.get("location");
      if (location) {
        let payload = await resturantModel.find({
          city: { $regex: new RegExp(location, "i") },
        });
        return NextResponse.json({
          payload,
          success: true,
          message: "Successfully",
        });
      }
    } else {
      let payload = await resturantModel.find();
      return NextResponse.json({
        payload,
        success: true,
        message: "Successfully",
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
