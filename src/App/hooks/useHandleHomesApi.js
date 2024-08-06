import { useEffect, useState, useCallback, useMemo } from "react";
import { Config } from "../constant/Index";

export const useHandleHomesApi = ({ initialAction = "GET" }) => {
  const [allHomes, setAllHomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const baseUrl = `${Config.serverUrl}homes`;

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

  // Function to fetch all homes
  const getAllHomes = useCallback(async () => {
    const data = await handleApiCall(baseUrl, "GET");
    if (data) setAllHomes(data);
  }, [handleApiCall, baseUrl]);

  const addHome = useCallback(
    async (newHome) => {
      if (!userId) {
        setIsError(true);
        setError("User ID not found.");
        return null;
      }
      
      const data = await handleApiCall(baseUrl, "POST", { ...newHome, user_id: userId });
      if (data) setAllHomes((prev) => [...prev, data]);
      return data;
    },
    [handleApiCall, userId, baseUrl]
  );

  const updateHome = useCallback(
    async (id, updatedHome) => {
      const data = await handleApiCall(`${baseUrl}/${id}`, "PUT", updatedHome);
      if (data) {
        setAllHomes((prev) =>
          prev.map((home) => (home.id === id ? data : home))
        );
      }
      return data;
    },
    [handleApiCall, baseUrl]
  );

  const deleteHome = useCallback(
    async (id) => {
      const data = await handleApiCall(`${baseUrl}/${id}`, "DELETE");
      if (data) {
        setAllHomes((prev) => prev.filter((home) => home.user_id !== id));
      }
      return data;
    },
    [handleApiCall, baseUrl]
  );

  useEffect(() => {
    if (initialAction === "GET") {
      getAllHomes();
    }
  }, [initialAction, getAllHomes]);

  const allUserHomes = useMemo(() => {
    return allHomes.filter(home => home.user_id == userId);
  }, [allHomes, userId]);

  return {
    allHomes,
    allUserHomes,
    isLoading,
    isError,
    error,
    getAllHomes,
    addHome,
    updateHome,
    deleteHome,
  };
};

export default useHandleHomesApi;