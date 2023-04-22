import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const Notifications = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const handleDelete = async (id) => {
    // delete
    setNotifications((prev) => prev.filter((val) => val.id !== id));
  };

  const getNotifications = async () => {
    try {
      const response = await axiosPrivate.get(`/notifications/${auth.id}`);
      console.log(response?.data);
      setNotifications(response.data);
    } catch (err) {
      console.error(err?.message);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="pt-12 pb-48">
      <h1 className="text-4xl font-semibold">Notifications</h1>
      {notifications?.length ? (
        <div className="mt-6">
          {notifications.map((notif, i) => (
            <div key={i} className="px-4 py-3 mt-3 bg-gray-100 rounded-md">
              <h3 className="flex justify-between text-lg font-semibold">
                {notif.title}{" "}
                <button onClick={() => handleDelete(notif.id)}>
                  <FontAwesomeIcon className="text-red-500" icon={faTimes} />
                </button>
              </h3>
              <p>{notif.description}</p>
              <Link
                to={notif.link}
                className="block mt-2 font-semibold text-blue-500 transition duration-200 hover:text-red-500"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6">No notifications found</p>
      )}
    </div>
  );
};

export default Notifications;
