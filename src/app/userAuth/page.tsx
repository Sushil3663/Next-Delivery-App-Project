"use client";
import React, { useState } from "react";
import UserSignUp from "../_components/UserSignUp";
import CustomerHeader from "../_components/CustomerHeader";
import Fotter from "../_components/Fotter";
import UserLogin from "../_components/UserLogin";

const UserAuth = () => {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <div className="container">
      <CustomerHeader />
      <h2 className="auth-header">Login/SignUp Page</h2>
      {login ? <UserLogin /> : <UserSignUp />}

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
