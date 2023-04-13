import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const DashboardLayout = () => {
  const { auth } = useAuth();
  const logout = useLogout();

  return (
    <>
      {/* navbar */}
      <nav className="fixed z-20 w-64 min-h-screen px-4 py-10 text-white bg-black">
        <img src="/favicon.png" className="w-20 mx-auto" alt="" />
        <h2 className="mt-2 font-semibold text-center uppercase">
          Crypto Electronics
        </h2>
        <h1 className="text-3xl font-bold mt-[2px] text-center uppercase">
          Dashboard
        </h1>
        <div className="flex flex-col gap-2 mt-8">
          <Link
            to="/products"
            className="px-2 py-2 transition duration-200 rounded-md hover:bg-opacity-20 hover:bg-white"
          >
            Products
          </Link>
          {auth?.roles?.includes(5150) && (
            <Link
              to="/users"
              className="px-2 py-2 transition duration-200 rounded-md hover:bg-opacity-20 hover:bg-white"
            >
              Users
            </Link>
          )}
          <button
            className="px-2 py-2 mt-4 font-semibold transition duration-200 bg-red-600 rounded-md hover:bg-red-700"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
      {/* content */}
      <div className="w-[calc(100vw-256px)] min-h-screen ml-auto">
        {/* navbar */}
        <nav className="fixed z-10 w-[calc(100vw-256px)] px-4 py-4 bg-white border-b-2">
          <div className="flex items-center justify-end">
            <p>
              Welcome, {auth?.user || "User"}{" "}
              <span className="font-semibold">
                (
                {auth?.roles?.includes(5150)
                  ? "Admin"
                  : auth?.roles?.includes(1984)
                  ? "Editor"
                  : auth?.roles?.includes(2001)
                  ? "User"
                  : ""}
                )
              </span>
            </p>
          </div>
        </nav>
        {/* content */}
        <section className="w-full min-h-[calc(100vh-57.6px)] bg-slate-50 top-[57.6px] relative px-4 py-6">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default DashboardLayout;
