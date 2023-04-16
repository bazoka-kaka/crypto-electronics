import {
  faShield,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="w-2/6 pr-8">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="flex flex-col gap-4 mt-6">
        <Link
          to="/dashboard"
          className={`p-2 pr-24 font-semibold border-2 ${
            pathname === "/dashboard"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          } rounded-xl flex items-center gap-3`}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 ${
              pathname === "/dashboard"
                ? "text-white bg-blue-500"
                : "text-gray-600 bg-gray-400"
            } rounded-md`}
          >
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span>
            Account{" "}
            <span className="block text-sm font-normal">
              Personal Informations
            </span>
          </span>
        </Link>
        <Link
          to="/dashboard/cart"
          className={`p-2 pr-24 font-semibold border-2 ${
            pathname === "/dashboard/cart"
              ? "border-black bg-gray-100"
              : "border-gray-200"
          } rounded-xl flex items-center gap-3`}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 ${
              pathname === "/dashboard/cart"
                ? "text-white bg-blue-500"
                : "text-gray-600 bg-gray-400"
            } rounded-md`}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </span>
          <span>
            Cart{" "}
            <span className="block text-sm font-normal">
              Payments and Details
            </span>
          </span>
        </Link>
        <Link
          to="/dashboard/security"
          className={`p-2 pr-24 font-semibold border-2 ${
            pathname === "/dashboard/security"
              ? "border-black bg-gray-100"
              : "border-gray-200"
          } rounded-xl flex items-center gap-3`}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 ${
              pathname === "/dashboard/security"
                ? "text-white bg-blue-500"
                : "text-gray-600 bg-gray-400"
            } rounded-md`}
          >
            <FontAwesomeIcon icon={faShield} />
          </span>
          <span>
            Security{" "}
            <span className="block text-sm font-normal">Change Password</span>
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
