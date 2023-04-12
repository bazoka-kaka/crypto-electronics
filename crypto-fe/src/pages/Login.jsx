import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LOGIN_URL = "/auth";

const Login = () => {
  const userRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(JSON.stringify(response));
      setUser("");
      setPwd("");
      navigate("/", { from: location });
    } catch (err) {
      if (err?.response?.status === 400) {
        setErrMsg("Invalid entries");
      } else if (err?.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Authentication failed");
      }
    }
  };

  return (
    <div className="py-12 max-w-[800px] flex items-center mx-auto min-h-[calc(100vh-65.6px)]">
      <div className="w-full p-8">
        {errMsg && (
          <p className="w-full bg-red-500 font-semibold text-white p-2 rounded-md mb-4">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="inline-block w-4 h-4 text-white rounded-full"
            />{" "}
            {errMsg}
          </p>
        )}
        <h1 className="text-3xl text-center font-semibold">
          Login into Your Account
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
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
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
          </div>
          <p className="mt-8">
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
