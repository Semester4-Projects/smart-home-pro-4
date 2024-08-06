import React, { useState } from "react";
import "./home.css";
import HomeCard from "../../Component/HomeCard/HomeCard";
import HomePopup from "../../Component/HomePopup/HomePopup";
import { useHandleHomesApi } from "../../hooks/useHandleHomesApi";

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {
    allUserHomes,
    isLoading,
    isError,
    error,
    addHome,
    updateHome,
    deleteHome,
  } = useHandleHomesApi({});
  const [selectedHome, setSelectedHome] = useState(null);

  const handleAddHome = async (newHome) => {
    await addHome(newHome);
    setIsPopupOpen(false);
    setSelectedHome(null);
  };

  const handleUpdateHome = async (id, updatedHome) => {
    await updateHome(id, updatedHome);
    setIsPopupOpen(false);
    setSelectedHome(null);
  };

  const handleDeleteHome = async (id) => {
    await deleteHome(id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="home">
      <h1 className="title seperator">
        <span></span>
        Temperature Checker
        <div className="btn" onClick={() => setIsPopupOpen(true)}>
          Add
          <i className="ri-add-fill"></i>
        </div>
      </h1>
      <div className="cards__container">
        {allUserHomes &&
          allUserHomes.map((home) => (
            <HomeCard
              key={home.id}
              home={home}
              setSelectedHome={setSelectedHome}
              onDelete={handleDeleteHome}
              setPopup={setIsPopupOpen}
            />
          ))}
      </div>
      {error && <div>Error: {error}</div>}
      {isPopupOpen && (
        <HomePopup
          setPopup={setIsPopupOpen}
          selectedHome={selectedHome}
          closePopup={() => {
            setSelectedHome(null);
            setIsPopupOpen(false);
          }}
          onAdd={handleAddHome}
          onUpdate={handleUpdateHome}
        />
      )}
    </div>
  );
}

export default Home;
