"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import delivery from "../../../public/delivery.png";
import "./style.css";

const ResturantHeader = () => {
  let [detail, setDetail] = useState<boolean>(false);
  // console.log(detail);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let userData = localStorage.getItem("resturantUser");
    let storedData = JSON.parse(userData as string) || {};
    // console.log(storedData);
    if (storedData?.email) {
      setDetail(true);
    } else {
      router.push("/resturant");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("resturantUser");
    localStorage.clear();
    router.push("/resturant");
  };

  return (
    <div className="header-wrapper">
      <div className="image">
        <Image src={delivery} alt="image" width={80} height={50} />
      </div>
      <div className="route-list">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {detail ? (
            <>
              <li>
                <Link href={"/"}>Profile</Link>
              </li>

              <li>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href={"/"}>Login/SignUp</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ResturantHeader;
