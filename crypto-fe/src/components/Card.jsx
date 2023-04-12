import React from "react";

const Card = ({ product }) => {
  return (
    <a
      href="/"
      className="w-64 hover:scale-[101%] transition duration-100 rounded-md border-[1px] border-black"
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-80 h-40 object-cover object-center"
      />
      <div className="p-4">
        <h3>{product.name}</h3>
        {/* price */}
        <h4 className="font-semibold text-lg mt-1">${product.price}</h4>
        {/* labels */}
        <div className="flex flex-wrap gap-2 mt-4 text-sm">
          {product.tags.map((tag, i) => (
            <button key={i} className="px-2 bg-slate-200 rounded-md">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Card;
