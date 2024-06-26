"use client";
import React, { useState } from "react";
import UserSignUp from "../_components/UserSignUp";
import CustomerHeader from "../_components/CustomerHeader";
import Fotter from "../_components/Fotter";
import UserLogin from "../_components/UserLogin";
import { useSearchParams } from "next/navigation";
const UserAuth = () => {
  const [login, setLogin] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const order = searchParams.get("order");
  console.log(order);
  return (
    <div className="container">
      <CustomerHeader />
      <h2 className="auth-header">Login/SignUp Page</h2>
      {login ? (
        <UserLogin order={order as string} />
      ) : (
        <UserSignUp order={order as string} />
      )}

      <p onClick={() => setLogin(!login)} className="button-text">
        {login ? (
          <p>
            Don't have an account?{" "}
            <span style={{ color: "red", textDecoration: "underline" }}>
              SignUp
            </span>
          </p>
        ) : (
          <p>
            Already have an account:{" "}
            <span style={{ color: "red", textDecoration: "underline" }}>
              Login
            </span>
          </p>
        )}
      </p>
      <Fotter />
    </div>
  );
};

export default UserAuth;
