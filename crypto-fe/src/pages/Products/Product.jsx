import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Product = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1, { from: location, replace: true, preventScrollReset: false });
  };

  useEffect(() => {
    setProduct(products.find((pro) => pro._id === id));
  }, [id, products]);

  const addToCart = async () => {
    try {
      const response = await axiosPrivate.post(
        "/carts/buy",
        JSON.stringify({ userId: auth?.id, productId: id, total: 1 })
      );
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      console.error(err?.message);
    }
  };

  return !product ? (
    <p>Loading...</p>
  ) : (
    <div className="flex items-center justify-center min-h-[calc(100vh-65.6px)]">
      <div className="flex">
        <div className="w-2/5 pr-5">
          <img src={product.imgUrl} alt={product.name} />
        </div>
        <div className="w-3/5 pl-5">
          <h1 className="text-2xl uppercase">{product.name}</h1>
          <p className="mt-2">
            Stock: {product.stock} | Sold: {product.sold}
          </p>
          <h2 className="mt-6 text-2xl font-bold">${product.price}</h2>
          <p className="mt-6">{product.description}</p>
          {/* cta */}
          <div className="flex gap-4 mt-12">
            <button className="px-12 py-3 font-bold transition duration-200 border-2 border-black rounded-md hover:bg-gray-100">
              Chat
            </button>
            <button
              onClick={addToCart}
              className="px-12 py-3 font-bold text-white transition duration-200 bg-black border-2 border-black rounded-md hover:bg-gray-50 hover:text-black"
            >
              Add to cart
            </button>
          </div>
          <button className="mt-8" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faAngleLeft} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
