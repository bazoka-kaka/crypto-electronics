import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProduct = async () => {
      try {
        const response = await axiosPrivate.get(`/products/${id}`, {
          signal: controller.signal,
        });
        console.log(response?.data);
        isMounted && setProduct(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err.message !== "canceled") {
          console.error(err);
        }
        setIsLoading(false);
      }
    };

    getProduct();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">{product?.name}</h1>
      <div className="p-4 mt-4 bg-white rounded-md">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              ID: <span className="font-semibold">{product._id}</span>
            </p>
            <p>
              Name: <span className="font-semibold">{product.name}</span>
            </p>
            <p>
              Price: <span className="font-semibold">${product.price}</span>
            </p>
            <p>
              Stock: <span className="font-semibold">{product.stock}</span>
            </p>
            <p>
              Sold: <span className="font-semibold">{product.sold}</span>
            </p>
            <p>
              Tags: <span className="font-semibold">{product.tags}</span>
            </p>
            <img
              src={product.imgUrl}
              alt=""
              className="object-cover object-center w-48 h-48 mt-2"
            />
          </>
        )}
      </div>
      <div className="mt-6">
        <Link
          to="/products"
          className="px-4 py-2 font-semibold text-white transition duration-200 bg-blue-500 rounded-md"
        >
          Return
        </Link>
      </div>
    </div>
  );
};

export default Product;
