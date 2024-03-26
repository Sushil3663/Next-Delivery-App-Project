"use client";
import AddFoodItem from "@/app/_components/AddFoodItem";
import { ApiResponse, FoodItem } from "@/app/_components/common";
import FoodItemList from "@/app/_components/FoodItemList";
import ResturantHeader from "@/app/_components/ResturantHeader";
import React, { useEffect, useState } from "react";
interface Store {
  email: string;
  password?: string;
  rname: string;
  city: string;
  address: string;
  phone: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const page = () => {
  const [add, setAdd] = useState<string>("dashboard");

  const [data, setData] = useState<FoodItem[]>([]);

  useEffect(() => {
    const restaurantUserString = localStorage.getItem("resturantUser");
    const restaurantUser: Store = restaurantUserString
      ? JSON.parse(restaurantUserString)
      : null;
    // setId(restaurantUser?._id);
    const fetchData = async () => {
      let response = await fetch(
        `http://localhost:3000/api/addfoods/${restaurantUser?._id}`,
        {
          method: "GET",
          headers: {
            contentType: "application/json",
          },
        }
      );
      let result: ApiResponse = await response.json();
      setData(result?.data);
    };
    fetchData();
  }, [add === "dashboard"]);

  return (
    <div>
      <ResturantHeader />
      <div>
        <button onClick={() => setAdd("add")} className="button-sep">
          Add Food
        </button>
        <button onClick={() => setAdd("dashboard")} className="button-sep">
          Dashboard
        </button>
      </div>
      {add === "dashboard" ? (
        <FoodItemList initialData={data} />
      ) : (
        <AddFoodItem />
      )}
    </div>
  );
};

export default page;
