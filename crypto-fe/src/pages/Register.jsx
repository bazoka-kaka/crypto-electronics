import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="py-12 max-w-[800px] items-center flex mx-auto min-h-[calc(100vh-65.6px)]">
      <div className="w-full p-8">
        <h1 className="text-3xl text-center font-semibold">
          Register New User
        </h1>
        <form className="mt-4">
          <div>
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              id="fullname"
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              type="password"
              id="password_confirmation"
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
          </div>
          <p className="mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-red-600 transition duration-200"
            >
              Login
            </Link>
          </p>
          <button className="mt-4 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
