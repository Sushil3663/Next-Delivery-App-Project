import { FoodModel } from "@/app/lib/foodsModel";
import { resturantModel } from "@/app/lib/resturantsModel";
import { NextRequest, NextResponse } from "next/server";
interface ContentParams {
  detailId: string;
}
export async function GET(
  req: NextRequest,
  content: { params: ContentParams }
) {
  try {
    let detailId = content?.params?.detailId;
    let payload = await resturantModel.findOne({ _id: detailId });
    const foodItems = await FoodModel.find({ resto_id: detailId });
    return NextResponse.json({
      payload,
      foodItems,
      success: true,
      message: "Get Restro Detail successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error" },
      { status: 500 }
    );
  }
}
