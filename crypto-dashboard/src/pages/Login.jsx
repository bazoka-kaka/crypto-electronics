import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const { setAuth, persist, setPersist } = useAuth();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      console.log(accessToken, roles);
      setAuth({ user, pwd, accessToken, roles });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.message);
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err?.response?.status === 400) {
        setErrMsg("Username and password are required.");
      } else if (err?.response?.status === 401) {
        setErrMsg("Unauthorized.");
      } else {
        setErrMsg("Login failed.");
      }

      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-[500px] w-full">
        <p
          ref={errRef}
          className={
            errMsg
              ? "font-semibold text-white bg-red-500 rounded-md px-4 py-2 mb-4"
              : "hidden"
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-3xl font-semibold text-center">
          Login into Your Account
        </h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <label htmlFor="username" className="block font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-describedby="uidnote"
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />

          <label htmlFor="password" className="block mt-4 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-describedby="pwdnote"
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />

          <div className="mt-2">
            <input
              type="checkbox"
              id="persist"
              checked={persist}
              onChange={togglePersist}
            />{" "}
            <label htmlFor="persist">Trust this device</label>
          </div>

          <button className="px-4 py-2 mt-4 font-semibold text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-400">
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <span className="font-semibold text-blue-500 transition duration-200 hover:text-red-500">
            {/*put router link here*/}
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
