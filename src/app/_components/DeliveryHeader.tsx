"use client";
import Image from "next/image";
import React from "react";
import delivery from "../../../public/delivery.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DeliveryHeader = () => {
  const router = useRouter();

  return (
    <div className="header-wrapper">
      <div className="image">
        <Image src={delivery} alt="image" width={80} height={50} />
      </div>
      <div className="route-list">
        <ul>
          <li>
            <Link href={"/"} style={{ color: "purple" }}>
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveryHeader;
