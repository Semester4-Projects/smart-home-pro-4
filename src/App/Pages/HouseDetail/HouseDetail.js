import React, { useEffect, useState } from "react";
import RoomCard from "../../Component/RoomCard/RoomCard";
import "./HouseDetail.css";
import HouseDetailCard from "../../Component/HouseDetailCard/HouseDetailCard";
import { useLocation } from "react-router-dom";
import RoomDetailPopup from "../../Component/RoomDetailPopup/RoomDetailPopup";
import { useHandleRoomsApi } from "../../hooks/useHandleRoomsApi";

function HouseDetail() {
  const [popup, setPopup] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const location = useLocation();
  const { homeId, home } = location?.state;
  const {
    filteredRooms: allRooms,
    isLoading,
    isError,
    error,
    addRoom: addRoomApi,
    updateRoom: updateRoomApi,
    deleteRoom: deleteRoomApi
  } = useHandleRoomsApi({ initialAction: "GET", homeId: homeId });

  const handleAddRoom = () => {
    setRoomId(null);
    setPopup(true);
  };

  const handleRoomSubmit = async (roomData) => {
    if (roomId) {
      await updateRoomApi(roomId, roomData);
    } else {
      await addRoomApi(roomData);
    }
    setPopup(false);
    setRoomId(null);
  };

  const handleDeleteRoom = async (id) => {
    await deleteRoomApi(id);
  };

  return (
    <div id="mainHouseDetail">
      <HouseDetailCard data={home} onDelete={handleDeleteRoom} allRooms={allRooms} />
      <div className="room__container">
        <h1 className="small__title seperator">
          <span></span> 
          Rooms
          <div onClick={handleAddRoom} className="btn">
            Add
            <i className="ri-add-fill"></i>
          </div>
        </h1>
        <div className="cards__container">
          {allRooms.map((room) => (
            <RoomCard 
              key={room.id} 
              data={room} 
              room={room} 
              allRooms={allRooms}
              home={home}
              setPopup={setPopup} 
              setRoomId={setRoomId}
              onDelete={handleDeleteRoom}
            />
          ))}
        </div>
      </div>

      {popup && <RoomDetailPopup
        roomId={roomId}
        setRoomId={setRoomId}
        setPopup={setPopup}
        onSubmit={handleRoomSubmit}
        initialData={allRooms.find(room => room.id === roomId)}
      />}
    </div>
  );
}

export default HouseDetail;