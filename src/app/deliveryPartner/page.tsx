"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";
import CustomerHeader from "../_components/CustomerHeader";
import Fotter from "../_components/Fotter";
import toast from "react-hot-toast";
import { deliveryResponse, MyApiResponse } from "../_components/common";
const DeliveryPartner = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    password: "",
    cpassword: "",
    city: "",
    address: "",
  });

  const [error, setError] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(data);
    const { name, phone, password, cpassword, city, address } = data;
    if (password === cpassword) {
      setError(false);
      let response = await fetch(
        "http://localhost:3000/api/deliveryPartnersSignUp",
        {
          method: "POST",
          body: JSON.stringify({ name, phone, password, city, address }),
        }
      );
      const apiResponse: deliveryResponse = await response.json();
      if (apiResponse?.success) {
        // console.log(apiResponse?.payload?.password);
        delete apiResponse?.payload?.password;
        toast("sign Up successful");
        localStorage.setItem("delivery", JSON.stringify(apiResponse?.payload));
        setData({
          name: "",
          phone: "",
          password: "",
          cpassword: "",
          city: "",
          address: "",
        });
      }
    } else {
      setError(true);
    }
  };

  const [login, setLogin] = useState({ phone: "", password: "" });

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLogin((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { phone, password } = login;
    console.log(password);
    let response = await fetch(
      "http://localhost:3000/api/deliveryPartnersLogin",
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({ phone, password }),
      }
    );

    let apiResponse: deliveryResponse = await response.json();

    if (apiResponse?.success) {
      delete apiResponse?.payload?.password;
      localStorage.setItem("delivery", JSON.stringify(apiResponse?.payload));
      toast("Login successful");
      setLogin({
        phone: "",
        password: "",
      });
    }
  };
  return (
    <>
      <CustomerHeader />
      <div className="container">
        <div className="main-form">
          <form className="form" onSubmit={handleSubmitLogin}>
            <p id="heading">Login</p>
            <div className="field">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
              </svg>
              <input
                placeholder="Mobile Number"
                className="input-field"
                type="phone"
                name="phone"
                value={login?.phone}
                onChange={handleChangeLogin}
                required
                autoComplete="off"
              />
            </div>
            <div className="field">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              <input
                placeholder="Password"
                className="input-field"
                type="password"
                name="password"
                value={login?.password}
                onChange={handleChangeLogin}
                required
                autoComplete="off"
              />
            </div>
            <div className="btn">
              <button className="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
          </form>

          <form className="form" onSubmit={handleSubmit}>
            <p id="heading">Sign Up</p>
            <div className="field">
              <input
                placeholder="Username"
                className="input-field"
                type="text"
                required
                name="name"
                value={data?.name}
                onChange={handleChange}
                autoComplete="off"
              />
              <hr />
              <input
                placeholder="Mobile Number"
                className="input-field"
                name="phone"
                value={data?.phone}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="field">
              <input
                placeholder="Password"
                className="input-field"
                type="password"
                name="password"
                value={data?.password}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              {error && (
                <span style={{ color: "red" }}>
                  Password and C_Password does not match!
                </span>
              )}
              <hr />
              <input
                placeholder="Conform Password"
                className="input-field"
                type="password"
                name="cpassword"
                value={data?.cpassword}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              {error && (
                <span style={{ color: "red" }}>
                  Password and C_Password does not match!
                </span>
              )}
            </div>
            <div className="field">
              <input
                placeholder="Enter City"
                className="input-field"
                type="text"
                name="city"
                value={data?.city}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              <hr />
              <input
                placeholder="Enter Address"
                className="input-field"
                type="text"
                name="address"
                value={data?.address}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="btn">
              <button className="button2">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
      <Fotter />
    </>
  );
};

export default DeliveryPartner;
