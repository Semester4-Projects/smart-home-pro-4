import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Layout from "./Layout";
import HouseDetail from "../Pages/HouseDetail/HouseDetail";
import RoomDetail from "../Pages/RoomDetail/RoomDetail";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
function ReactRoutes() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [window.location?.pathname, localStorage.getItem("user")]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="houseDetail" element={<HouseDetail />} />
              <Route path="roomDetail" element={<RoomDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
          <Route path="*" element={isLogin ? <Home /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default ReactRoutes;
