import {
  faMinusCircle,
  faPlusCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductCard = ({ product }) => {
  return (
    <div className="flex justify-between mt-2 border-[1px] border-gray-300 px-4 py-2 rounded-md">
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{product?.name}</h3>
        <p className="text-gray-700">
          Total Bought:{" "}
          <FontAwesomeIcon className="cursor-pointer" icon={faMinusCircle} />{" "}
          <span className="font-semibold">{product?.totBought}</span>{" "}
          <FontAwesomeIcon className="cursor-pointer" icon={faPlusCircle} />{" "}
          <FontAwesomeIcon
            className="text-red-600 transition duration-200 cursor-pointer hover:text-red-500"
            icon={faTrashAlt}
          />
        </p>
      </div>
      <div className="flex flex-col items-end">
        <button className="px-4 py-[3px] text-lg font-semibold text-white bg-blue-500 hover:bg-gray-50 hover:text-blue-500 border-2 border-blue-500 transition duration-200 rounded-md">
          Details
        </button>
        <p className="mt-2 text-right">
          Total price:{" "}
          <span className="font-semibold">${product?.totPrice}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
