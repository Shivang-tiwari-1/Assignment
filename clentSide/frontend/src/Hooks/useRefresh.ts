import { useContext } from "react";
import { axiosInstance } from "../api/axios";
import AuthContext from "../context/Auth/AuthContext";
import AlertContext from "../context/Alert/AlertContext";

const useRefresh = () => {
  const { setAuth } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  console.log("ssssssssssssssssssss");
  const refresh = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/refreshToken",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("ssssssssssssssssss", response);
      if (response.status === 200 && response.data && response.data.data) {
        const { accessToken, refreshToken } = response.data;
        setAuth((prev) => ({
          ...prev,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }));

        return accessToken;
      } else {
        showAlert("Error occurred during token refresh", "danger");
      }
    } catch (error) {
      if (!error.response) {
        showAlert("no response from the server", "danger");
      } else if (error.response.status === 401) {
        showAlert("you need to be loggedin to use this feature", "danger");
      } else if (error.response.status === 500) {
        showAlert("you need to be loggedin", "danger");
      }
    }
  };
  return refresh;
};

export default useRefresh;
