import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  const getUsers = async () => {
    const controller = new AbortController();
    let isMounted = true;

    const action = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response?.data);
        isMounted && setUsers(response.data);
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
        const response = await axiosPrivate.delete(`/users/${id}`, {
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
        <h1 className="text-2xl font-semibold">Users List</h1>
        {auth?.roles?.find((role) => [1984, 5150].includes(role)) && (
          <Link
            to="/users/create"
            className="px-2 py-[2px] font-semibold text-white bg-green-500 hover:bg-green-400 transition duration-200 rounded-sm"
          >
            Add User
          </Link>
        )}
      </div>
      <div className="p-4 mt-4 bg-white rounded-md">
        <table className="w-full border-[.1px] text-start">
          <thead className="text-left bg-blue-200 border-b-[.1px] border-slate-700">
            <tr>
              <th className="px-2 py-[2px]">No</th>
              <th className="px-2 py-[2px]">Username</th>
              <th className="px-2 py-[2px]">Fullname</th>
              <th className="px-2 py-[2px]">Email</th>
              <th className="px-2 py-[2px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length ? (
              users.map((user, i) => (
                <tr key={i}>
                  <td className="px-2 py-[2px]">{i + 1}</td>
                  <td className="px-2 py-[2px]">{user.username}</td>
                  <td className="px-2 py-[2px]">{user.fullname}</td>
                  <td className="px-2 py-[2px]">{user.email}</td>
                  <td className="px-2 py-[2px] flex gap-2">
                    {auth?.roles?.find((role) =>
                      [2001, 5150, 1984].includes(role)
                    ) && (
                      <Link
                        to={`/users/${user._id}`}
                        className="text-blue-500 underline"
                      >
                        Details
                      </Link>
                    )}
                    {auth?.roles?.find((role) =>
                      [5150, 1984].includes(role)
                    ) && (
                      <Link
                        to={`/users/update/${user._id}`}
                        className="px-2 font-semibold text-white bg-blue-500 rounded-sm"
                      >
                        Update
                      </Link>
                    )}
                    {auth?.roles?.includes(5150) && (
                      <button
                        onClick={() => handleDelete(user._id)}
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
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
