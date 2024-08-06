import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
function Layout() {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
