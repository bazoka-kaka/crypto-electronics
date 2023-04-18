import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import useLogout from "../../hooks/useLogout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const logout = useLogout();
  const [products, setProducts] = useState([]);
  const [totPrice, setTotPrice] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axiosPrivate.get(`/users/${auth?.id}`);
      const resProducts = response?.data?.cart?.products;
      setProducts(resProducts);
      setTotPrice(response?.data?.cart?.totalPrice);
      setIsLoading(false);
    } catch (err) {
      console.error(err?.message);
      setIsLoading(false);
    }
  };

  const payCart = async () => {
    try {
      await axiosPrivate.post(
        "/carts/pay",
        JSON.stringify({ userId: auth?.id })
      );
      navigate(0);
    } catch (err) {
      console.error(err?.message);
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
          {products?.length ? (
            <div className="flex items-center justify-between px-4 py-2 mt-4 border-2 border-gray-200 rounded-md">
              <p>
                Total price: <span className="font-semibold">${totPrice}</span>
              </p>
              <button
                type="button"
                onClick={payCart}
                className="px-3 py-[3px] font-semibold text-gray-50 transition duration-200  bg-green-500 text-lg rounded-md hover:bg-green-400 hover:text-gray-50"
              >
                Pay Cart
              </button>
            </div>
          ) : null}
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
