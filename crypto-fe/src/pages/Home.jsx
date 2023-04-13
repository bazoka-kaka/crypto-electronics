import React from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
const Home = ({ products }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-12 pt-12 pb-48">
        <section id="mouses">
          <h2 className="text-xl font-semibold">Mouses</h2>
          {/* cards */}
          <Cards tagName={"Mouse"} products={products} />
          <div className="flex justify-center w-full">
            <button className="mt-8 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
              Show All
            </button>
          </div>
        </section>
        <section id="keyboards">
          <h2 className="text-xl font-semibold">Keyboards</h2>
          {/* cards */}
          <Cards tagName={"Keyboard"} products={products} />
          <div className="flex justify-center w-full">
            <button className="mt-8 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
              Show All
            </button>
          </div>
        </section>
        <section id="laptops">
          <h2 className="text-xl font-semibold">Laptops</h2>
          {/* cards */}
          <Cards tagName={"Laptop"} products={products} />
          <div className="flex justify-center w-full">
            <button className="mt-8 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
              Show All
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
