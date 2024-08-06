import React from "react";
import { useNavigate } from "react-router-dom";

function RoomCard({
  data,
  setPopup,
  setRoomId,
  onDelete,
  home,
  allRooms,
  room,
}) {
  const navigate = useNavigate();
 
  const editRoom = (e) => {
    e.stopPropagation();
    setRoomId(data.id);
    setPopup(true);
  };

  const deleteRoom = async (e) => {
    e.stopPropagation();
    await onDelete(data.id);
  };

  const navigateRoomDetail = () => {
    navigate("/roomDetail", {
      state: { roomId: data.id, home: home, allRooms: allRooms, room: room },
    });
  };

  return (
    <div onClick={navigateRoomDetail} className="room__card">
      <div className="card__img">
        <img src="images/room.png" alt="Room Image" />
        <span className="room__text">Room Number</span>
      </div>
      <span className="room__text">
        id
        <span>{data.id}</span>
      </span>
      <span className="room__text">
        Room Name
        <span>{data.roomName}</span>
      </span>
      <i className="ri-edit-box-fill edit__icon" onClick={editRoom}></i>
      <i className="ri-delete-bin-7-fill delete__icon" onClick={deleteRoom}></i>
    </div>
  );
}

export default RoomCard;
