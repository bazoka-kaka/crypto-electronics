import React from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="py-12 flex flex-col gap-12">
        <section id="mouses">
          <h2 className="font-semibold text-xl">Mouses</h2>
          {/* cards */}
          <Cards tagName={"Mouse"} showNum={4} />
          <div className="flex w-full justify-center">
            <button className="mt-8 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
              Show All
            </button>
          </div>
        </section>
        <section id="keyboards">
          <h2 className="font-semibold text-xl">Keyboards</h2>
          {/* cards */}
          <Cards tagName={"Keyboard"} showNum={4} />
          <div className="flex w-full justify-center">
            <button className="mt-8 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
              Show All
            </button>
          </div>
        </section>
        <section id="laptops">
          <h2 className="font-semibold text-xl">Laptops</h2>
          {/* cards */}
          <Cards tagName={"Laptop"} showNum={4} />
          <div className="flex w-full justify-center">
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