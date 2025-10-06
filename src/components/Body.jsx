import React from "react";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" || location.pathname.startsWith("/chat");

  return (
    <div>
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Body;
