import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      const accessToken = response.data.accessToken;
      const roles = response.data.roles;
      const username = response.data.user;
      console.log({ accessToken, roles, username });
      return { ...prev, accessToken, roles, username };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
