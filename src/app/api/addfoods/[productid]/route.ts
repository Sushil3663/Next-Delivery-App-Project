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
    const productid: any = content.params.productid;
    console.log(productid);
    if (productid === undefined) {
      return NextResponse.json({
        success: false,
        message: "Id parameter is missing in the request query.",
      });
    }

    let payload = await FoodModel.find({ resto_id: productid });
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

export async function PUT(req: NextApiRequest, content: any) {
  try {
    let productid = content.params.productid;
    let data = await req.body();
    let payload = await FoodModel.findOneAndUpdate({ _id: productid }, data);
    return NextResponse.json({
      data: payload,
      success: true,
      message: "Get Restro Food Item Updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function DELETE(req: NextApiRequest, content: any) {
  try {
    let productid = content.params.productid;
    console.log(productid);
    let filter = { _id: productid };

    let payload = await FoodModel.deleteOne(filter);
    return NextResponse.json({
      data: payload,
      success: true,
      message: "Get Restro Food Item Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
