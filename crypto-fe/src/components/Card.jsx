import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="w-64 hover:scale-[101%] transition duration-100 rounded-md border-[1px] border-black bg-white"
    >
      <img
        src={product.imgUrl}
        alt={product.name}
        className="object-cover object-center h-40 w-80"
      />
      <div className="p-4">
        <h3>{product.name}</h3>
        {/* price */}
        <h4 className="mt-1 text-lg font-semibold">${product.price}</h4>
        {/* labels */}
        <div className="flex flex-wrap gap-2 mt-4 text-sm">
          {product.tags.split(",").map((tag, i) => (
            <button key={i} className="px-2 rounded-md bg-slate-200">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Card;
