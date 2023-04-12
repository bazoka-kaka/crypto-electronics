import React from "react";

const Nav = () => {
  return (
    <nav className="flex w-screen bg-white fixed px-48 py-4 border-b-2 border-black items-center justify-between">
      <h1 className="uppercase text-2xl tracking-wider">Crypto Electronics</h1>
      <ul className="flex items-center gap-4">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Products</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
        <span> | </span>
        <li>
          <a href="/">Register</a>
        </li>
        <li>
          <a href="/">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
