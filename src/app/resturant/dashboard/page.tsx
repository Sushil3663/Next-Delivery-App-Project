"use client";
import AddFoodItem from "@/app/_components/AddFoodItem";
import ResturantHeader from "@/app/_components/ResturantHeader";
import React, { useState } from "react";

const page = () => {
  const [add, setAdd] = useState<string>("dashboard");
  return (
    <div>
      <ResturantHeader />
      <button onClick={() => setAdd("add")}>Add Food</button>
      <button onClick={() => setAdd("dashboard")}>Dashboard</button>
      {add === "dashboard" ? <p>Dashboard</p> : <AddFoodItem />}
    </div>
  );
};

export default page;
