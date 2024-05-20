"use client";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    let data = localStorage.getItem("delivery");
    let deliveryInfo = data && JSON.parse(data);
    if (!deliveryInfo) {
      router.push("/deliveryPartner");
    }
  }, []);
  return <div>DashBoard</div>;
};

export default Dashboard;
