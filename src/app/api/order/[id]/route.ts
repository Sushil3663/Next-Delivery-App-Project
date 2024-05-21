import { connectionStrs } from "@/app/lib/db";
import { FoodModel } from "@/app/lib/foodsModel";
import { orderModel } from "@/app/lib/orderModel";
import { resturantModel } from "@/app/lib/resturantsModel";
import { usersModel } from "@/app/lib/usersModel";
import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

mongoose.connect(connectionStrs);

export async function GET(request: NextApiRequest, content: any) {
  try {
    const id: any = content.params.id;

    let result = await orderModel.find({ deliveryBoy_id: id });
    console.log(result);
    if (result) {
      let foodItemIds = result?.map((foodItem) => foodItem?.foodItemsIds);

      try {
        let food = await Promise.all(
          foodItemIds.flat().map(async (foodId) => {
            return await FoodModel.findOne({ _id: foodId });
          })
        );

        let payload = await Promise.all(
          result.map(async (foodId) => {
            let restroInfo: {
              // data?: any;
              amount?: number;
              status?: string;
            } = {};

            restroInfo.amount = foodId.amount;
            restroInfo.status = foodId.status;
            return restroInfo;
          })
        );

        return NextResponse.json({
          payload,
          food,
          success: true,
          message: "Item Delivery List",
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
