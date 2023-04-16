import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import useLogout from "../../hooks/useLogout";

const Cart = () => {
  const logout = useLogout();
  const [products] = useState([
    {
      id: 1,
      name: "Product One",
      price: 500,
      totBought: 2,
      totPrice: 1000,
    },
    {
      id: 2,
      name: "Product Two",
      price: 700,
      totBought: 3,
      totPrice: 2100,
    },
    {
      id: 3,
      name: "Product Three",
      price: 2000,
      totBought: 1,
      totPrice: 2000,
    },
  ]);

  return (
    <div>
      <h1 className="text-xl font-semibold">Cart</h1>
      <div className="w-full p-5 mt-6 border-2 border-gray-200 rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-700">
            Unpaid Products
          </h2>
          <Link
            to="/"
            className="text-blue-500 transition duration-200 hover:text-red-500"
          >
            Show paid products
          </Link>
        </div>
        <div className="mt-4">
          {/* product card */}
          {products?.length ? (
            products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={logout}
            className="p-2 font-semibold text-red-400 transition duration-200 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
