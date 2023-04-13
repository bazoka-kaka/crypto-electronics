import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1, { from: location });
  };

  useEffect(() => {
    products.map((pro) => {
      if (pro.id === parseInt(id)) {
        setProduct(pro);
      }
    });
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-65.6px)]">
      <div className="flex">
        <div className="w-2/5 pr-5">
          <img src={product.img} alt={product.name} />
        </div>
        <div className="w-3/5 pl-5">
          <h1 className="text-2xl uppercase">{product.name}</h1>
          <p className="mt-2">Stock: 1 | Sold: 50</p>
          <h2 className="mt-6 text-2xl font-bold">${product.price}</h2>
          <p className="mt-6">{product.description}</p>
          {/* cta */}
          <div className="flex gap-4 mt-12">
            <button className="px-12 py-3 font-bold transition duration-200 border-2 border-black rounded-md hover:bg-gray-100">
              Chat
            </button>
            <button className="px-12 py-3 font-bold text-white transition duration-200 bg-black border-2 border-black rounded-md hover:bg-gray-50 hover:text-black">
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
