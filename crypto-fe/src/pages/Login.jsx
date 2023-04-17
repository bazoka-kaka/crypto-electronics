import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

const Login = () => {
  const userRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth, persist, setPersist } = useAuth();

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

          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const username = response?.data?.user;
      const id = response?.data?.id;
      console.log(accessToken, roles, user, id);
      setAuth({ accessToken, roles, user: username, id });
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

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <div className="py-12 max-w-[800px] flex items-center mx-auto min-h-[calc(100vh-65.6px)]">
      <div className="w-full p-8">
        {errMsg && (
          <p className="w-full p-2 mb-4 font-semibold text-white bg-red-500 rounded-md">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="inline-block w-4 h-4 text-white rounded-full"
            />{" "}
            {errMsg}
          </p>
        )}
        <img
          src="/test.png"
          alt="Crypto Electronics"
          className="w-20 h-20 mx-auto"
        />
        <p className="mt-2 text-2xl text-center uppercase">
          Crypto Electronics
        </p>
        <p className="text-lg font-bold text-center uppercase">
          ECommerce Website
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-center">Login</h1>
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
          <div className="mt-4">
            <input
              type="checkbox"
              id="persist"
              checked={persist}
              onChange={togglePersist}
            />{" "}
            <label htmlFor="persist">Trust this device</label>
          </div>
          <button className="mt-4 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
            Login
          </button>
          <p className="mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 transition duration-200 hover:text-red-600"
            >
              Create new account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
