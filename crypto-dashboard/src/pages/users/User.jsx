import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${id}`, {
          signal: controller.signal,
        });
        console.log(response?.data);
        isMounted && setUser(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err.message !== "canceled") {
          console.error(err);
        }
        setIsLoading(false);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">{user?.fullname}</h1>
      <div className="p-4 mt-4 bg-white rounded-md">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              Username: <span className="font-semibold">{user?.username}</span>
            </p>
            <p>
              Fullname: <span className="font-semibold">{user?.fullname}</span>
            </p>
            <p>
              Email: <span className="font-semibold">{user?.email}</span>
            </p>
            <p>Roles:</p>
            <ul className="font-semibold">
              {user.roles &&
                Object.keys(user?.roles).map(
                  (role, i) =>
                    user.roles[role] !== null && (
                      <li className="ml-6 list-disc" key={i}>
                        {role}
                      </li>
                    )
                )}
            </ul>
          </>
        )}
      </div>
      <div className="mt-6">
        <Link
          to="/users"
          className="px-4 py-2 font-semibold text-white transition duration-200 bg-blue-500 rounded-md"
        >
          Return
        </Link>
      </div>
    </div>
  );
};

export default User;
