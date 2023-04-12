import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-48 border-t-2 border-black pt-10 pb-24 flex justify-between items-start">
      {/* title */}
      <div>
        <h2 className="uppercase text-xl font-semibold tracking-wider">
          Crypto Electronics
        </h2>
        <p className="mt-4 font-light">&copy; bazoka-kaka, 2023</p>
      </div>
      {/* Socials */}

      <div className="flex gap-24">
        <div>
          <h2 className="font-semibold text-xl">Socials</h2>
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
          <h2 className="font-semibold text-xl">Links</h2>
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