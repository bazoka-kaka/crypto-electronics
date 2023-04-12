import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-12 max-w-[800px] flex items-center mx-auto min-h-[calc(100vh-65.6px)]">
      <div className="w-full p-8">
        <h1 className="text-3xl text-center font-semibold">
          Login into Your Account
        </h1>
        <form className="mt-4">
          <div>
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
          </div>
          <p className="mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-red-600 transition duration-200"
            >
              Create new account
            </Link>
          </p>
          <button className="mt-4 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
