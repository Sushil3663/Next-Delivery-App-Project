import { NextApiResponse, NextApiRequest } from "next";
import mongoose from "mongoose";
import { connectionStrs } from "@/app/lib/db";
import { FoodModel } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";

mongoose.connect(connectionStrs);
export async function GET(
  req: NextApiRequest,
  content: any
  //   { params }: any
) {
  try {
    // const { productid } = params;
    // const { productid } = req.query;
    const id: any = content.params.id;
    // console.log(id);
    if (id === undefined) {
      return NextResponse.json({
        success: false,
        message: "Id parameter is missing in the request query.",
      });
    }

    let payload = await FoodModel.findOne({ _id: id });
    // console.log(payload);
    return NextResponse.json({
      data: payload,
      success: true,
      message: "Get Restro Food Item successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function PUT(req: Request, content: any) {
  try {
    const id: any = content.params.id;
    // console.log(id);
    let data = await req.json();
    // console.log(data);
    let payload = await FoodModel.findOneAndUpdate({ _id: id }, data);
    return NextResponse.json({
      data: payload,
      success: true,
      message: "Update Restro Food Item Updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
