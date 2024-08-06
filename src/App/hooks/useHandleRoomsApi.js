import { useEffect, useState, useCallback, useMemo } from "react";
import { Config } from "../constant/Index";

export const useHandleRoomsApi = ({ initialAction = "GET", homeId }) => {
  const [allRooms, setAllRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  console.log(homeId, "homeID")
  const baseUrl = `${Config.serverUrl}rooms`;

  const handleApiCall = useCallback(async (url, method, body = null) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setIsError(true);
      setError(error.message);
      console.error("API call error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAllRooms = useCallback(async () => {
    console.log(`${baseUrl}`, "url");
    const data = await handleApiCall(`${baseUrl}`, "GET");
    if (data) setAllRooms(data);
  }, [handleApiCall, baseUrl]);

  const addRoom = useCallback(
    async (newRoom) => {
      const roomWithHomeId = { ...newRoom, home_id: homeId };
      const data = await handleApiCall(baseUrl, "POST", roomWithHomeId);
      if (data) setAllRooms((prev) => [...prev, data]);
      return data;
    },
    [handleApiCall, homeId, baseUrl]
  );

  const updateRoom = useCallback(
    async (id, updatedRoom) => {
      const data = await handleApiCall(`${baseUrl}/${id}`, "PUT", updatedRoom);
      if (data) {
        setAllRooms((prev) =>
          prev.map((room) => (room.id === id ? data : room))
        );
      }
      return data;
    },
    [handleApiCall, baseUrl]
  );

  const deleteRoom = useCallback(
    async (id) => {
      const data = await handleApiCall(`${baseUrl}/${id}`, "DELETE");
      if (data) {
        setAllRooms((prev) => prev.filter((room) => room.id !== id));
      }
      return data;
    },
    [handleApiCall, baseUrl]
  );

  useEffect(() => {
    if (initialAction === "GET") {
      getAllRooms();
    }
  }, [initialAction, getAllRooms]);
  const filteredRooms = useMemo(() => {
    // if (!homeId) return allRooms;
    return allRooms.filter(room => room.home_id == homeId);
  }, [allRooms, homeId]);

  return {
    allRooms,
    filteredRooms,
    isLoading,
    isError,
    error,
    getAllRooms,
    addRoom,
    updateRoom,
    deleteRoom,
  };
};

export default useHandleRoomsApi;