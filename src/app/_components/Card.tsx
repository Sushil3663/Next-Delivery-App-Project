import React from "react";
import "./card.css";
import { useRouter } from "next/navigation";

interface IProps {
  rname: string;
  phone: string;
  city: string;
  address: string;
  email: string;
  id: string;
}
const Card = ({ rname, phone, city, address, email, id }: IProps) => {
  const router = useRouter();
  const handleDetail = (id: string) => {
    // console.log(id);
    router.push(`/explore/${id}`);
  };
  return (
    <div>
      <div className="card" onClick={() => handleDetail(id)}>
        <div className="card__border"></div>
        <div className="card_title__container">
          <span className="card_title">{rname}</span>
        </div>
        <hr className="line" />
        <ul className="card__list">
          <li className="card__list_item">
            <span className="check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="check_svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="list_text">{phone}</span>
          </li>
          <li className="card__list_item">
            <span className="check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="check_svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="list_text">
              {city}, {address}
            </span>
          </li>

          <li className="card__list_item">
            <span className="list_text">{email}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
