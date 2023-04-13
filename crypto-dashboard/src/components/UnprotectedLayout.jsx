import React from "react";
import { Outlet } from "react-router-dom";

const UnprotectedLayout = () => {
  return (
    <div className="px-8">
      <Outlet />
    </div>
  );
};

export default UnprotectedLayout;
