import { connectionStrs } from "@/app/lib/db";
import { FoodModel } from "@/app/lib/foodsModel";
import { orderModel } from "@/app/lib/orderModel";
import { resturantModel } from "@/app/lib/resturantsModel";
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

export async function GET(request: NextRequest) {
  try {
    let queryParams = request.nextUrl.searchParams;
    let user_id = queryParams.get("userId");

    let result = await orderModel.find({ user_id: user_id });
    console.log(result);
    if (result) {
      let foodItemIds = result?.map((foodItem) => foodItem?.foodItemsIds);

      try {
        let food = await Promise.all(
          foodItemIds.flat().map(async (foodId) => {
            // let restroInfo: {
            //   data?: any;
            // } = {};
            return await FoodModel.findOne({ _id: foodId });

            // let status = result.map((foodItem) => foodItem?.status);
            // let amount = result.map((foodItem) => foodItem?.amount);
          })
        );

        let payload = await Promise.all(
          result.map(async (foodId) => {
            let restroInfo: {
              // data?: any;
              amount?: number;
              status?: string;
            } = {};

            // restroInfo.data = await resturantModel.findOne({
            //   _id: foodId.resto_id,
            // });

            restroInfo.amount = foodId.amount;
            restroInfo.status = foodId.status;
            return restroInfo;
          })
        );

        return NextResponse.json({
          payload,
          food,
          success: true,
          message: "Item Successfully Ordered",
        });
      } catch (error) {
        return NextResponse.json({
          success: false,
          message: "An error occurred while fetching the food items.",
        });
      }
    } else {
      return NextResponse.json({
        success: true,
        message: "Item Successfully Order",
      });
    }
  } catch (err) {
    return NextResponse.json({
      messsage: "Internal Server Error",
      status: "500",
    });
  }
}
