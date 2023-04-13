import React, { useState } from "react";
import Cards from "../../components/Cards";

const Products = ({ products }) => {
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
    <div className="pt-12 pb-48">
      <h1 className="text-4xl font-semibold">All Products</h1>
      <div className="flex flex-wrap gap-2 mt-4 text-sm">
        {tags.map((tag, i) => (
          <button
            key={i}
            className="px-2 transition duration-200 rounded-md cursor-pointer hover:bg-slate-300 bg-slate-200"
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
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
      <Cards products={products} />
      <div className="flex justify-center w-full">
        <button className="mt-8 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
          Show More
        </button>
      </div>
    </div>
  );
};

export default Products;
