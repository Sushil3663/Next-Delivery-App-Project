import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import Fotter from "./_components/Fotter";

export default function Home() {
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
              <input
                className="field-1"
                type="text"
                placeholder="Select Place"
              />
            </div>
            <div>
              <input
                type="text"
                className="field-1"
                placeholder="Enter Food or Resturant Name"
              />
            </div>
          </div>
        </div>
      </div>

      <Fotter />
    </>
  );
}
