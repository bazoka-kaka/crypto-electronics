import Footer from "./Footer";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedLayout = () => {
  return (
    <>
      <Nav />
      <div className="pt-[65.6px] px-48 min-h-screen bg-gray-50">
        <div className="flex py-12 min-h-[calc(100vh-65.6px)]">
          <Sidebar />
          <div className="w-4/6">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProtectedLayout;
