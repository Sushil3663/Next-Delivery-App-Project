"use client";
import React from "react";
import UserSignUp from "../_components/UserSignUp";
import CustomerHeader from "../_components/CustomerHeader";
import Fotter from "../_components/Fotter";

const UserAuth = () => {
  return (
    <div className="container">
      <CustomerHeader />
      <UserSignUp />
      <Fotter />
    </div>
  );
};

export default UserAuth;
