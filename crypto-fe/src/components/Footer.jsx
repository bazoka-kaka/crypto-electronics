import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex items-start justify-between px-48 pt-10 pb-24 border-t-2 border-black">
      {/* title */}
      <div>
        <h2 className="text-xl font-semibold tracking-wider uppercase">
          Crypto Electronics
        </h2>
        <p className="mt-4 font-light">&copy; Volvinco Industries, 2023</p>
      </div>
      {/* Socials */}

      <div className="flex gap-24">
        <div>
          <h2 className="text-xl font-semibold">Socials</h2>
          <ul className="flex flex-col gap-2 mt-4 font-light">
            <li>
              <a href="/">Github</a>
            </li>
            <li>
              <a href="/">Instagram</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
          </ul>
        </div>
        {/* CTA */}
        <div>
          <h2 className="text-xl font-semibold">Links</h2>
          <ul className="flex flex-col gap-2 mt-4 font-light">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
