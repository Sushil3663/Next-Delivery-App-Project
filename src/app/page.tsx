"use client";
import CustomerHeader from "./_components/CustomerHeader";
import Fotter from "./_components/Fotter";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import {
  ListResponse,
  ListResponsePayload,
  LocationResponse,
} from "./_components/common";
import Card from "./_components/Card";

export default function Home() {
  const [dropDown, setDropDown] = useState<Array<string>>();
  const [list, setList] = useState<Array<ListResponsePayload>>();
  console.log(list);

  const [location, setLocation] = useState<string>("");
  const [resturant, setResturant] = useState<string>("");

  // console.log(city);

  let responseData = async () => {
    try {
      // let response: LocationResponse = await axios.get(
      //   "http://localhost:3000/api/customer/locations"
      // );
      let response = await fetch(
        "http://localhost:3000/api/customer/locations",
        {
          method: "GET",
          headers: {
            contentType: "application/json",
          },
        }
      );
      let result: LocationResponse = await response.json();
      // console.log(result);
      setDropDown(result?.payload);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let responseListData = async () => {
    try {
      let url = "http://localhost:3000/api/customer";
      if (location !== "" && resturant !== "") {
        url = url;
      } else if (location !== "") {
        url += `?location=${location}`;
      } else if (resturant !== "") {
        url += `?resturant=${resturant}`;
      }
      let response = await fetch(url, {
        method: "GET",
        headers: {
          contentType: "application/json",
        },
      });
      let result: ListResponse = await response.json();
      if (result?.success) {
        setList(result?.payload);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    responseData();
  }, []);

  useEffect(() => {
    responseListData();
  }, [location, resturant]);
  // console.log(list);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
    // responseListData();
  };

  const handleResturantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResturant(e.target.value);
  };

  const handleClear = () => {
    setLocation("");
    setResturant("");
  };
  return (
    <>
      <CustomerHeader />
      <div className="container">
        <div className="food-text">
          <div className="text-heading">
            <h1>Food Delivery App</h1>
          </div>
          <div className="input-field">
            <div>
              <select
                name="resturant"
                id="resturant"
                className="field-1"
                value={location}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  --Please choose a city--
                </option>
                {dropDown?.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                className="field-1"
                value={resturant}
                placeholder="Enter Food or Resturant Name"
                onChange={handleResturantChange}
              />
            </div>
            <button className={styles.button} onClick={handleClear}>
              Clear
            </button>
          </div>
          <div className={styles.info}>
            {list?.map((data) => (
              <Card
                id={data?._id}
                rname={data?.rname}
                phone={data?.phone}
                city={data?.city}
                address={data?.address}
                email={data?.email}
              />
            ))}
          </div>
        </div>
      </div>

      <Fotter />
    </>
  );
}
