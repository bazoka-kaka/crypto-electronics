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
      const user = response.data.user;
      const id = response.data.id;
      console.log({ accessToken, roles, user, id });
      return { ...prev, accessToken, roles, user, id };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
