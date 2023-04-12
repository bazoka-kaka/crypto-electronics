import React from "react";

const Card = () => {
  return (
    <a
      href="/"
      className="w-64 hover:scale-[101%] transition duration-100 rounded-md border-[1px] border-black"
    >
      <img
        src="https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/non-braid/hyjal-g502-hero/g502-hero-gallery-1-nb.png"
        alt="Logitech G502 HERO High Performance Gaming Mouse"
        className="w-80 h-40 object-cover object-center"
      />
      <div className="p-4">
        <h3>Logitech G502 HERO High Performance Gaming Mouse</h3>
        {/* price */}
        <h4 className="font-semibold text-lg mt-1">$200</h4>
        {/* labels */}
        <div className="flex flex-wrap gap-2 mt-4 text-sm">
          <button className="px-2 bg-slate-200 rounded-md">Gaming</button>
          <button className="px-2 bg-slate-200 rounded-md">Mouse</button>
          <button className="px-2 bg-slate-200 rounded-md">Logitech</button>
          <button className="px-2 bg-slate-200 rounded-md">LED</button>
        </div>
      </div>
    </a>
  );
};

export default Card;
