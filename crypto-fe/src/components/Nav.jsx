import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const { auth } = useAuth();
  return (
    <nav className="flex w-screen bg-white z-10 fixed px-48 py-4 border-b-2 border-black items-center justify-between">
      <h1 className="uppercase text-2xl tracking-wider">Crypto Electronics</h1>
      <ul className="flex items-center gap-6">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <span> | </span>
        {!auth?.user ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <p>Welcome, {auth?.user}</p>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
