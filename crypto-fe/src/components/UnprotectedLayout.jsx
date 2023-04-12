import React, { useEffect } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { Outlet, useLocation } from "react-router-dom";

const UnprotectedLayout = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  return (
    <>
      <Nav />
      <div className="pt-[65.6px] px-48 min-h-screen bg-gray-50">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UnprotectedLayout;
