import React, { useState } from "react";

const Header = () => {
  const [tags, setTags] = useState([
    "Gaming",
    "Programming",
    "Office",
    "Mouse",
    "Keyboard",
    "Computer",
    "Laptop",
  ]);

  return (
    <header className="text-center pt-12">
      <h1 className="text-5xl">Welcome to Crypto Electronics</h1>
      <p className="mt-4 text-xl">
        We sell all kinds of electronics devices for your absolute best
        programming, gaming, office, and other needs
      </p>
      {/* search */}
      <div className="flex justify-center gap-2 mt-6">
        <input
          type="text"
          name="search"
          id="search"
          className="border-[1px] border-black rounded-md px-4 py-[1px]"
          placeholder="Enter product name here"
        />
        <button className="rounded-md transition duration-200 hover:bg-white hover:text-black border-black border-[1px] px-4 py-[1px] bg-black text-white font-semibold">
          Search
        </button>
      </div>
      {/* tags */}
      <div className="mt-6">
        <p className="text-sm">Click a category that you want</p>
        <div className="flex flex-wrap gap-2 mt-2 text-sm justify-center">
          {tags.map((tag, i) => (
            <button
              key={i}
              className="px-2 hover:bg-slate-300 transition duration-200 bg-slate-200 rounded-md"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
