import { useEffect, useState } from "react";
import useLogout from "../../hooks/useLogout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-z\s]{4,50}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const NOTIF_LIST = { Offers: 2000, Payment: 2001, Updates: 2002 };

const Account = () => {
  const logout = useLogout();
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({});
  const [disabledInput, setDisabled] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [notifs, setNotifs] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const getUser = async () => {
    try {
      const response = await axiosPrivate.get(`/users/${auth?.id}`);
      const notifications = Object.values(response?.data?.notifications).filter(
        Boolean
      );
      setNotifs(notifications);
      setUser(response.data);
    } catch (err) {
      console.error(err?.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(user.fullname);
    const v2 = USER_REGEX.test(user.username);
    const v3 = EMAIL_REGEX.test(user.email);
    if (!v1) {
      setErrMsg("Invalid name");
      return;
    } else if (!v2) {
      setErrMsg("Invalid username");
      return;
    } else if (!v3) {
      setErrMsg("Invalid email");
      return;
    }
    try {
      const response = await axiosPrivate.put(
        `/users`,
        JSON.stringify({
          id: auth?.id,
          user: user.username,
          email: user.email,
          fullname: user.fullname,
        })
      );
      console.log(response?.data);
      setAuth((prev) => ({ ...prev, user: response?.data?.username }));
      setDisabled(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err?.response?.status === 400) {
        setErrMsg("ID parameter is required");
      } else if (err?.response?.status === 409) {
        setErrMsg("Username already taken");
      } else {
        setErrMsg("User update failed");
      }
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Account</h1>
      <div className="w-full p-5 mt-6 border-2 border-gray-200 rounded-xl">
        {errMsg && (
          <p className="w-full p-2 mb-4 font-semibold text-white bg-red-500 rounded-md">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="inline-block w-4 h-4 text-white rounded-full"
            />{" "}
            {errMsg}
          </p>
        )}
        <h2 className="text-lg font-semibold text-slate-700">
          Personal Information
        </h2>
        <div className="mt-4">
          <h3>Avatar</h3>
          <div className="flex items-center gap-8 mt-2">
            <img
              src="/portrait.jpg"
              alt=""
              className="object-cover rounded-md w-28 h-28"
            />
            <div className="flex items-center gap-8">
              <button className="px-4 py-2 font-semibold text-blue-600 transition duration-200 border-2 border-blue-600 rounded-md hover:text-gray-50 hover:bg-blue-600">
                Change
              </button>
              <button className="font-semibold text-gray-500 transition duration-200 hover:text-red-400">
                Delete
              </button>
            </div>
          </div>
        </div>
        <form>
          <div className="grid grid-cols-2 mt-4 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                value={user.fullname}
                onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                disabled={disabledInput}
                className={`block w-full p-2 mt-2 border-2 border-gray-400 ${
                  disabledInput && "bg-gray-200 text-gray-500"
                } rounded-md`}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                disabled={disabledInput}
                className={`block w-full p-2 mt-2 border-2 border-gray-400 ${
                  disabledInput && "bg-gray-200 text-gray-500"
                } rounded-md`}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                disabled={disabledInput}
                className={`block w-full p-2 mt-2 border-2 border-gray-400 ${
                  disabledInput && "bg-gray-200 text-gray-500"
                } rounded-md`}
              />
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-700">
              Notifications
            </h2>
            <div className="mt-2">
              <input
                type="checkbox"
                id="offers"
                name="notifications"
                checked={notifs?.includes(NOTIF_LIST.Offers)}
              />{" "}
              <label htmlFor="offers">Interesting Offers</label>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                id="payment_status"
                name="notifications"
                checked={notifs?.includes(NOTIF_LIST.Payment)}
              />{" "}
              <label htmlFor="payment_status">Payment Status</label>
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                id="updates"
                name="notifications"
                checked={notifs?.includes(NOTIF_LIST.Updates)}
              />{" "}
              <label htmlFor="updates">Product Updates</label>
            </div>
          </div>
          <div className="flex justify-between mt-12">
            <button
              type="button"
              onClick={logout}
              className="p-2 font-semibold text-red-400 transition duration-200 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-gray-50"
            >
              Logout
            </button>
            {disabledInput ? (
              <button
                type="button"
                className={`p-2 font-semibold text-gray-400 border-2 border-gray-400 hover:bg-gray-400 hover:text-gray-50 transition duration-200 rounded-md`}
                onClick={() => setDisabled(false)}
              >
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`p-2 font-semibold  text-gray-50 border-2 bg-red-400 border-red-400 hover:bg-gray-50 hover:text-red-400 transition duration-200 rounded-md`}
                  onClick={() => {
                    setDisabled(true);
                    getUser();
                    setErrMsg("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`p-2 font-semibold  text-blue-400 border-2 border-blue-400 hover:bg-blue-400 hover:text-gray-50 transition duration-200 rounded-md`}
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
