import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Cards from "../../components/Cards";
import { useEffect, useState } from "react";

const Products = ({ products, tags, selectedTags, setSelectedTags }) => {
  const [params] = useSearchParams();
  const [filterName, setFilterName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchValue}`, { from: location });
  };

  useEffect(() => {
    setFilterName(params.get("search"));
  }, [params]);

  return (
    <div className="pt-12 pb-48">
      <h1 className="text-4xl font-semibold">All Products</h1>
      <div className="flex flex-wrap gap-2 mt-4 text-sm">
        {tags.map((tag, i) => (
          <button
            key={i}
            onClick={() => {
              selectedTags?.includes(tag)
                ? setSelectedTags((prev) => prev?.filter((t) => t !== tag))
                : setSelectedTags((prev) => [...prev, tag]);
              setSearchValue("");
              navigate("/products", { from: location });
            }}
            className={`px-2 transition duration-200 rounded-md cursor-pointer ${
              selectedTags?.length
                ? selectedTags?.includes(tag)
                  ? "hover:bg-gray-600 bg-gray-700 text-gray-50"
                  : "bg-slate-200 hover:bg-slate-300"
                : "hover:bg-slate-300 bg-slate-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          name="search"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border-[1px] border-black rounded-md px-4 py-[1px]"
          placeholder="Enter product name here"
        />
        <button
          onClick={handleSearch}
          className="rounded-md transition duration-200 hover:bg-white hover:text-black border-black border-[1px] px-4 py-[1px] bg-black text-white font-semibold"
        >
          Search
        </button>
      </div>
      <Cards
        filterName={filterName}
        products={products}
        selectedTags={selectedTags}
      />
      <div className="flex justify-center w-full">
        <button className="mt-8 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
          Show More
        </button>
      </div>
    </div>
  );
};

export default Products;
