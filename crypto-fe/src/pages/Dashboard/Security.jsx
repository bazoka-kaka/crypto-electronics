import React, { useEffect, useState } from "react";
import useLogout from "../../hooks/useLogout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Security = () => {
  const logout = useLogout();
  const { auth } = useAuth();
  const [oldPwd, setOldPwd] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [oldPwd, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = PWD_REGEX.test(pwd);
    const v2 = pwd === matchPwd;
    if (!v1) {
      setErrMsg("Password is not valid");
      return;
    } else if (!v2) {
      setErrMsg("Password and password confirmation don't match");
      return;
    }
    try {
      const response = await axiosPrivate.put(
        `/users`,
        JSON.stringify({ id: auth?.id, pwd, oldPwd })
      );
      console.log(response?.data);
      setOldPwd("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err?.response?.status === 400) {
        setErrMsg("ID parameter is required");
      } else if (err?.response?.status === 401) {
        setErrMsg("Old password is wrong");
      } else {
        setErrMsg("Change password is failed");
      }
    }
  };

  const clearInputs = () => {
    setOldPwd("");
    setPwd("");
    setMatchPwd("");
  };

  return (
    <div>
      {errMsg && (
        <p className="w-full p-2 mb-4 font-semibold text-white bg-red-500 rounded-md">
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="inline-block w-4 h-4 text-white rounded-full"
          />{" "}
          {errMsg}
        </p>
      )}
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
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
                className="block w-full p-2 mt-2 border-2 border-gray-400 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="new_pass">New Password</label>
              <input
                type="password"
                id="new_pass"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="xxxxxxxx"
                className="block w-full p-2 mt-2 border-2 border-gray-400 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="pass_confirm">Confirm New Password</label>
              <input
                type="password"
                id="pass_confirm"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
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
                onClick={clearInputs}
                className="p-2 font-semibold text-gray-400 transition duration-200 border-2 border-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100"
              >
                Forget Change
              </button>
              <button
                type="button"
                onClick={handleSubmit}
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
