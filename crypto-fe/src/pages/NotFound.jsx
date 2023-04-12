import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 min-h-[calc(100vh-65.6px)]">
      <h1 className="text-4xl">404 - Not Found</h1>
      <Link
        to="/"
        className="mt-2 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2"
      >
        Home
      </Link>
    </div>
  );
};

export default NotFound;
