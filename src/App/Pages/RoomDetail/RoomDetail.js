import React, { useState } from "react";
import "./RoomDetail.css";
import RoomDetailCard from "../../Component/RoomDetailCard/RoomDetailCard";
import { Link, useLocation } from "react-router-dom";

function RoomDetail() {
  const location = useLocation();
  const { room, home, allRooms } = location?.state;
  console.log(room, "room");
  return (
    <div id="mainRoomDetail">
      <div className="house__detail">
        <div className="header__container">
          <h1 className="small__title">Room Details</h1>
          <div className="detail__container">
            <span className="detail__list">
              Id:
              <span>{room?.id}</span>
            </span>
            <span className="detail__list">
              Room:
              <span>{room?.roomName}</span>
            </span>
          </div>
        </div>

        <Link to="/" className="btn">
          Go Back to Home
        </Link>
      </div>
      <div className="room__container roomDetail__container">
        <h1 className="small__title">
          Rooms Temperature
          <span>General</span>
        </h1>
        <div className="tabs__container">
          <a className="tab active">General</a>
        </div>
        <div className="cards__container">
          <RoomDetailCard data={room} limits={room?.limits} />;
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
