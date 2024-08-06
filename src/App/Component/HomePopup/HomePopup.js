import React, { useState, useEffect } from "react";

function HomePopup({ selectedHome, onAdd, onUpdate, closePopup }) {
  const [data, setData] = useState({
    address: "",
    deviceEui: "",
    roomProfiles: [],
  });
  
  useEffect(() => {
    if (selectedHome) {
      setData({
        address: selectedHome.address || "",
        deviceEui: selectedHome.deviceEui || "",
        roomProfiles: selectedHome.roomProfiles || [],
      });
    }
  }, [selectedHome]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedHome) {
      onUpdate(selectedHome.id, data);
    } else {
      onAdd(data);
    }
    closePopup();
  };

  return (
    <form className="edit__popup" onSubmit={handleSubmit}>
      <h1 className="small__title full__area">
        {selectedHome ? "Edit" : "Add"} <span>House</span>
      </h1>

      <div className="input__field full__area">
        <span className="input__text">Address</span>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Write the Address of the house"
        />
      </div>

      <div className="input__field full__area">
        <span className="input__text">Device EUI</span>
        <input
          type="text"
          name="deviceEui"
          value={data.deviceEui}
          onChange={handleChange}
          placeholder="Write the Device EUI"
        />
      </div>

      <div className="seperator">
        <button type="submit" className="btn">
          Submit
        </button>
        <div className="btn" onClick={closePopup}>
          Cancel
        </div>
      </div>
    </form>
  );
}

export default HomePopup;
