import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import {
  faMinusCircle,
  faPlusCircle,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = ({ products, getProducts, createNotifications }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(0);
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
        JSON.stringify({ userId: auth?.id, productId: id, total: count })
      );
      console.log(JSON.stringify(response?.data));
      getProducts();
      createNotifications(
        auth.id,
        `${product.name} Added`,
        `${count} ${product.name} is successfully added to the cart`,
        "/dashboard/cart"
      );
      navigate("/", { from: location });
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
          {/* change total products */}
          <div className="flex items-center gap-2 mt-6 select-none">
            <button
              onClick={() => {
                if (count - 1 >= 0) setCount((prev) => prev - 1);
              }}
            >
              <FontAwesomeIcon className="text-2xl" icon={faMinusCircle} />
            </button>
            <span className="text-2xl font-semibold mb-[3px]">{count}</span>
            <button
              onClick={() => {
                if (count + 1 <= product.stock) setCount((prev) => prev + 1);
              }}
            >
              <FontAwesomeIcon className="text-2xl" icon={faPlusCircle} />
            </button>
          </div>
          {/* cta */}
          <div className="flex gap-4 mt-8">
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
