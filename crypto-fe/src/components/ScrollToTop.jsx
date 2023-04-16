import React, { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, id]);

  return <Outlet />;
};

export default ScrollToTop;
