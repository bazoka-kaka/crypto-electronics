import {
  faMinusCircle,
  faPlusCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, setProducts, products, getProducts }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const updateProduct = async (method) => {
    try {
      await axiosPrivate.put(
        "/carts/products",
        JSON.stringify({
          userId: auth?.id,
          productName: product?.name,
          method,
        })
      );
      getProducts();
      navigate(0);
      // const filteredProducts = products.filter(
      //   (pro) => pro.name !== product.name
      // );
      // if (method === "add") product.total += 1;
      // else product.total -= 1;
      // setProducts([...filteredProducts, product]);
    } catch (err) {
      console.error(err?.message);
    }
  };

  const deleteProduct = async () => {
    try {
      await axiosPrivate.post(
        `/carts/products/delete`,
        JSON.stringify({ userId: auth?.id, name: product.name })
      );
      getProducts();
      navigate(0);
    } catch (err) {
      console.error(err?.message);
    }
  };

  return (
    <div className="flex justify-between mt-2 border-[1px] border-gray-300 px-4 py-2 rounded-md">
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{product?.name}</h3>
        <p className="text-gray-700">
          Total Bought:{" "}
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => {
              if (product.total - 1 >= 0) updateProduct("sub");
            }}
            icon={faMinusCircle}
          />{" "}
          <span className="font-semibold">{product?.total}</span>{" "}
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => {
              if (product.total + 1 <= product.stock) updateProduct("add");
            }}
            icon={faPlusCircle}
          />{" "}
          <FontAwesomeIcon
            className="text-red-600 transition duration-200 cursor-pointer hover:text-red-500"
            onClick={deleteProduct}
            icon={faTrashAlt}
          />
        </p>
      </div>
      <div className="flex flex-col items-end">
        <button className="px-4 py-[3px] text-lg font-semibold text-white bg-blue-500 hover:bg-gray-50 hover:text-blue-500 border-2 border-blue-500 transition duration-200 rounded-md">
          Details
        </button>
        <p className="mt-2 text-right">
          Total to be paid:{" "}
          <span className="font-semibold">
            ${product?.total * product?.price}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
