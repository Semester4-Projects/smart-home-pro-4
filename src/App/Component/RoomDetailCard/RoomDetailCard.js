import React from "react";

function RoomDetailCard({limits, data}) {
  return (
    <div className="room__card" >
      <div className="card__img">
        <img src="images/temprautre.png" alt="Temperature Image"/>
        <span className="room__text">Room Temperature</span>
      </div>
      <span className="room__text">
        Min Temperature
        <span>{limits?.temperatureMin} Degree</span>
      </span>
      <span className="room__text">
        Max Temperature
        <span>{limits?.temperatureMax} Degree</span>
      </span>
      <span className="room__text">
        Current Temperature
        <span>{data.idealTemperature} Degree</span>
      </span>
    </div>
  );
}

export default RoomDetailCard;
