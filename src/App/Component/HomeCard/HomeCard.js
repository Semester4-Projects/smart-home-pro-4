import React from "react";
import { useNavigate } from "react-router-dom";

function HomeCard({ home, setSelectedHome, onDelete, setPopup }) {
  const navigate = useNavigate();

  const navigateHouseDetail = () => {
    navigate("/houseDetail", { state: { homeId: home.id, home: home } });
  };

  const editHome = (e) => {
    e.stopPropagation();
    setSelectedHome(home);
    setPopup(true);
  };

  const deleteHomeF = (e) => {
    e.stopPropagation();
    onDelete(home.id);
  };

  return (
    <div onClick={navigateHouseDetail} key={home.id} className="house__card">
      <div className="card__img">
        <img src="images/home.png" alt="Home Image" />
        <span className="house__text">{home.address}</span>
      </div>
      <span className="house__text">
        Id
        <span>{home.id}</span>
      </span>
      <span className="house__text">
        Device EUI
        <span>{home.deviceEui}</span>
      </span>

      <i
        className="ri-edit-box-fill edit__icon"
        onClick={(e) => editHome(e)}
      ></i>
      <i
        className="ri-delete-bin-7-fill delete__icon"
        onClick={(e) => deleteHomeF(e)}
      ></i>
    </div>
  );
}

export default HomeCard;