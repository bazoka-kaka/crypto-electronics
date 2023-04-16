import React from "react";
import useLogout from "../../hooks/useLogout";

const Security = () => {
  const logout = useLogout();
  return (
    <div>
      <h1 className="text-xl font-semibold">Security</h1>
      <div className="w-full p-5 mt-6 border-2 border-gray-200 rounded-xl">
        <h2 className="text-lg font-semibold text-slate-700">
          Change Password
        </h2>
        <form className="mt-4">
          <div className="flex flex-col w-1/2 gap-2">
            <div>
              <label htmlFor="old_pass">Old Password</label>
              <input
                type="password"
                id="old_pass"
                placeholder="xxxxxxxx"
                className="block w-full p-2 mt-2 border-2 border-gray-400 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="new_pass">New Password</label>
              <input
                type="password"
                id="new_pass"
                placeholder="xxxxxxxx"
                className="block w-full p-2 mt-2 border-2 border-gray-400 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="pass_confirm">Confirm New Password</label>
              <input
                type="password"
                id="pass_confirm"
                placeholder="xxxxxxxx"
                className="block w-full p-2 mt-2 border-2 border-gray-400 rounded-md"
              />
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
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 font-semibold text-gray-400 transition duration-200 border-2 border-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100"
              >
                Forget Change
              </button>
              <button
                type="submit"
                className="p-2 font-semibold transition duration-200 bg-blue-500 border-2 border-blue-500 rounded-md text-gray-50 hover:bg-gray-50 hover:text-blue-500"
              >
                Save Change
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Security;
