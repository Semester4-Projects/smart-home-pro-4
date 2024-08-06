import React from "react";
import { Link } from "react-router-dom";

function HouseDetailCard({ data, onDelete, allRooms }) {
  const houseDelete = () => {
    onDelete(data.id);
  };

  return (
    <div className="house__detail">
      <div className="header__container">
        <h1 className="small__title">House Details</h1>
        <div className="detail__container">
          <span className="detail__list">
            id
            <span>{data?.id}</span>
          </span>
          <span className="detail__list">
            Device EUI
            <span>{data?.deviceEui}</span>
          </span>
          <span className="detail__list">
            Address
            <span>{data?.address}</span>
          </span>
          <span className="detail__list">
            Number of Rooms
            <span>{allRooms?.length || 0}</span>
          </span>
        </div>
      </div>
      <div className="btns">
        <Link to="/" className="btn">
        Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default HouseDetailCard;
