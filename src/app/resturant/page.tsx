"use client";
import ResturantLogin from "../_components/resturantLogin";
import ResturantSignUp from "../_components/resturantSignUp";
import ResturantHeader from "../_components/ResturantHeader";
import Fotter from "../_components/Fotter";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
const ResturantPage = () => {
  const [login, setLogin] = useState<boolean>(true);
  const pathname = usePathname();
  let router = useRouter();

  useEffect(() => {
    let userData = localStorage.getItem("resturantUser");
    let storedData = JSON.parse(userData as string) || {};
    // console.log(storedData);
    if (storedData?.email && pathname == "/resturant") {
      router.push("/resturant/dashboard");
    }
  }, []);
  return (
    <div>
      <ResturantHeader />
      <h2 className="auth-header">Login/SignUp Page</h2>
      {login ? <ResturantLogin /> : <ResturantSignUp />}

      <p onClick={() => setLogin(!login)} className="button-text">
        {login
          ? `Don't have an account ? Sign Up `
          : "Already have an account: Login"}
      </p>
      <Fotter />
    </div>
  );
};

export default ResturantPage;
