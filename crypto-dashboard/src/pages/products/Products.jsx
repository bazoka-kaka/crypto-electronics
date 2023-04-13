import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  const getUsers = async () => {
    const controller = new AbortController();
    let isMounted = true;

    const action = async () => {
      try {
        const response = await axiosPrivate.get("/products", {
          signal: controller.signal,
        });
        console.log(response?.data);
        isMounted && setProducts(response.data);
        isMounted && setIsLoading(false);
      } catch (err) {
        if (err.message !== "canceled") {
          console.error(err.message);
        }
        isMounted && setIsLoading(false);
      }
    };

    action();

    return () => {
      controller.abort();
      isMounted = false;
    };
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = (id) => {
    const controller = new AbortController();

    const deleteUser = async () => {
      try {
        const response = await axiosPrivate.delete(`/products/${id}`, {
          signal: controller.signal,
        });
        console.log(response);
        getUsers();
      } catch (err) {
        if (err.message !== "canceled") {
          console.error(err.message);
        }
      }
    };

    deleteUser();

    return () => controller.abort();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products List</h1>
        {auth?.roles?.find((role) => [1984, 5150].includes(role)) && (
          <Link
            to="/products/create"
            className="px-2 py-[2px] font-semibold text-white bg-green-500 hover:bg-green-400 transition duration-200 rounded-sm"
          >
            Add Product
          </Link>
        )}
      </div>
      <div className="p-4 mt-4 bg-white rounded-md">
        <table className="w-full border-[.1px] text-start">
          <thead className="text-left bg-gray-200 border-b-[.1px] border-slate-700">
            <tr>
              <th className="px-2 py-[2px]">No</th>
              <th className="px-2 py-[2px]">Name</th>
              <th className="px-2 py-[2px]">Price</th>
              <th className="px-2 py-[2px]">Stock</th>
              <th className="px-2 py-[2px]">Sold</th>
              <th className="px-2 py-[2px]">Img</th>
              <th className="px-2 py-[2px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.length ? (
              products.map((product, i) => (
                <tr key={i}>
                  <td className="px-2 py-[2px]">{i + 1}</td>
                  <td className="px-2 py-[2px]">{product.name}</td>
                  <td className="px-2 py-[2px]">${product.price}</td>
                  <td className="px-2 py-[2px]">{product.stock}</td>
                  <td className="px-2 py-[2px]">{product.sold}</td>
                  <td className="px-2 py-[2px]">
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="object-cover object-center w-10 h-10 mx-auto"
                    />
                  </td>
                  <td className="px-2 py-[2px] flex gap-2">
                    {auth?.roles?.find((role) =>
                      [2001, 5150, 1984].includes(role)
                    ) && (
                      <Link
                        to={`/products/${product._id}`}
                        className="text-blue-500 underline"
                      >
                        Details
                      </Link>
                    )}
                    {auth?.roles?.find((role) =>
                      [5150, 1984].includes(role)
                    ) && (
                      <Link
                        to={`/products/update/${product._id}`}
                        className="px-2 font-semibold text-white bg-blue-500 rounded-sm"
                      >
                        Update
                      </Link>
                    )}
                    {auth?.roles?.includes(5150) && (
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-2 font-semibold text-white bg-red-500 rounded-sm"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : isLoading ? (
              <tr>
                <td colSpan={4} className="py-2 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4} className="py-2 text-center">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
