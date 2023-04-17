import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ tags, setSelectedTags }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (tag) => {
    setSelectedTags((prev) => [...prev, tag]);
    navigate("/products", { from: location });
  };

  return (
    <header className="pt-12 text-center">
      <h1 className="text-5xl">Welcome to Crypto Electronics</h1>
      <p className="mt-4 text-xl">
        We sell all kinds of electronics devices for your absolute best
        programming, gaming, office, and other needs
      </p>
      {/* search */}
      <div className="flex justify-center gap-2 mt-6">
        <input
          type="text"
          name="search"
          id="search"
          className="border-[1px] border-black rounded-md px-4 py-[1px]"
          placeholder="Enter product name here"
        />
        <button className="rounded-md transition duration-200 hover:bg-white hover:text-black border-black border-[1px] px-4 py-[1px] bg-black text-white font-semibold">
          Search
        </button>
      </div>
      {/* tags */}
      <div className="mt-6">
        <p className="text-sm">
          Select (by clicking) the categories of your choice
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-2 text-sm">
          {tags.map((tag, i) => (
            <button
              key={i}
              onClick={() => handleNavigate(tag)}
              className="px-2 transition duration-200 rounded-md hover:bg-slate-300 bg-slate-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
