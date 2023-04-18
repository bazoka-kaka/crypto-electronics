import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import useLogout from "../../hooks/useLogout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const logout = useLogout();
  const [products, setProducts] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      const response = await axiosPrivate.get(`/users/${auth?.id}`);
      const resProducts = response?.data?.cart?.products;
      setProducts(resProducts);
      setIsLoading(false);
    } catch (err) {
      console.error(err?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
            products?.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                setProducts={setProducts}
                products={products}
                getProducts={getProducts}
              />
            ))
          ) : isLoading ? (
            <p>Loading...</p>
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
