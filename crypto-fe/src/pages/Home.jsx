import React from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Cards from "../components/Cards";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="pt-[65.6px] px-48 min-h-screen">
        <Header />
        <div className="py-12">
          <section id="products">
            <h2 className="font-semibold text-xl">Products</h2>
            {/* cards */}
            <Cards />
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
