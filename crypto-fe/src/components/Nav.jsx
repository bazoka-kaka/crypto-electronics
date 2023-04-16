import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Nav = () => {
  const { auth } = useAuth();
  const logout = useLogout();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <nav className="fixed z-10 flex items-center justify-between w-screen px-48 py-4 bg-white border-b-2 border-black">
      <h1 className="text-2xl tracking-wider uppercase">Crypto Electronics</h1>
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
          <>
            <p>Welcome, {auth?.user}</p>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
