import React, { useState, useEffect } from "react";

function RoomDetailPopup({
  setPopup,
  roomId,
  setRoomId,
  onSubmit,
  initialData,
}) {
  const [data, setData] = useState({
    isChecked: false,
    roomName: "",
    idealTemp: "",
    minTemp: "",
    maxTemp: "",
    idealHum: "",
    minHum: "",
    maxHum: "",
  });

  useEffect(() => {
    if (initialData) {
      setData({
        isChecked: initialData.isDefault,
        roomName: initialData.roomName,
        idealTemp: initialData.idealTemperature,
        minTemp: initialData.limits.temperatureMin,
        maxTemp: initialData.limits.temperatureMax,
        idealHum: initialData.idealHumidity,
        minHum: initialData.limits.humidityMin,
        maxHum: initialData.limits.humidityMax,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const closePopup = () => {
    setPopup(false);
    setRoomId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      roomName: data.roomName,
      idealTemperature: parseFloat(data.idealTemp),
      isDefault: data.isChecked,
      idealHumidity: parseFloat(data.idealHum),
      limits: {
        humidityMin: parseFloat(data.minHum),
        humidityMax: parseFloat(data.maxHum),
        temperatureMin: parseFloat(data.minTemp),
        temperatureMax: parseFloat(data.maxTemp),
      },
    };
    onSubmit(formData);
  };

  return (
    <form className="edit__popup" onSubmit={handleSubmit}>
      <h1 className="small__title full__area">
        {roomId ? "Edit" : "Add"}
        <span>Room</span>
      </h1>
      <div className="form__container">
        <div className="form">
          <div className="input__field checkbox__field full__area">
            <input
              id="check"
              name="isChecked"
              type="checkbox"
              checked={data.isChecked}
              onChange={handleChange}
            />
            <label htmlFor="check">Is Checked</label>
          </div>

          <div className="input__field">
            <span className="input__text">Room Name</span>
            <input
              type="text"
              placeholder="Write the Room Name"
              name="roomName"
              value={data.roomName}
              onChange={handleChange}
            />
          </div>

          <div className="input__field">
            <span className="input__text">Current Temperature</span>
            <input
              type="number"
              placeholder="Write the Current Temperature of Room"
              name="idealTemp"
              value={data.idealTemp}
              onChange={handleChange}
            />
          </div>
          <div className="input__field">
            <span className="input__text">Min Temperature</span>
            <input
              type="number"
              name="minTemp"
              placeholder="Write the Minimum Temperature of Room"
              value={data.minTemp}
              onChange={handleChange}
            />
          </div>
          <div className="input__field">
            <span className="input__text">Max Temperature</span>
            <input
              name="maxTemp"
              type="number"
              placeholder="Write the Maximum Temperature of Room"
              value={data.maxTemp}
              onChange={handleChange}
            />
          </div>
          <div className="input__field">
            <span className="input__text">Current Humidity</span>
            <input
              name="idealHum"
              type="number"
              placeholder="Write the Current Humidity of Room"
              value={data.idealHum}
              onChange={handleChange}
            />
          </div>
          <div className="input__field">
            <span className="input__text">Min Humidity</span>
            <input
              name="minHum"
              type="number"
              placeholder="Write the Minimum Humidity of Room"
              value={data.minHum}
              onChange={handleChange}
            />
          </div>
          <div className="input__field">
            <span className="input__text">Max Humidity</span>
            <input
              type="number"
              placeholder="Write the Maximum Humidity of Room"
              name="maxHum"
              value={data.maxHum}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="seperator">
          <button type="submit" className="btn">
            Submit
          </button>
          <button type="button" className="btn" onClick={closePopup}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default RoomDetailPopup;
