import useAuth from "./useAuth";
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    setAuth({});

    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
      navigate(0, { from: location });
    } catch (err) {
      console.error(err?.message);
    }
  };

  return logout;
};

export default useLogout;
