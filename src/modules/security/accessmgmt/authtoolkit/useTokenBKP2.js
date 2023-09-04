import { useState, useEffect } from "react";
import { TOKEN_EXPIRATION_CHECK_FREQUENCY } from "../../../admin/setups/ConstDecl";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";

function useToken() {
  function getToken() {
    const userToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const payload1 = JSON.parse(atob(refreshToken.split(".")[1]));
      const refreshtokenexpiry = new Date(payload1.exp * 1000);
      console.log("Refresh Token Exipry time --> ", refreshtokenexpiry);
    }
    if (userToken) {
      const payload = JSON.parse(atob(userToken.split(".")[1]));
      const expirationTime = new Date(payload.exp * 1000);
      const currentTime = new Date();

      console.log("TOKEN Expiration Time : ", expirationTime);
      console.log("Current Time : ", currentTime);

      if (expirationTime < currentTime) {
        console.log("The Token is expired ", currentTime);
        localStorage.removeItem("token");
      }
    }

    return userToken;
  }

  const [token, setToken] = useState(getToken());
  const [username, setUsername] = useState(""); // Add username state

  async function refreshAccessToken() {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (!refresh_token) {
        removeToken();
        return;
      }

      const response = await axios.post(
        `${API_URL}/refresh_token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refresh_token}`, // Add Bearer token here
          },
        }
      );

      const { access_token } = response.data;
      saveToken(access_token, username);
    } catch (error) {
      console.error("Error refreshing access token: ", error);
      removeToken();
    }
  }

  function saveToken(userToken, userUsername) {
    localStorage.setItem("token", userToken);
    setToken(userToken);
    setUsername(userUsername); // Set the username when saving token
  }

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
    setUsername(""); // Clear the username when removing token
  }

  useEffect(() => {
    function checkTokenExpiration() {
      const userToken = getToken();
      if (!userToken) {
        refreshAccessToken(); // Token has expired, try to refresh it
      }
    }

    checkTokenExpiration();

    const interval = setInterval(
      checkTokenExpiration,
      TOKEN_EXPIRATION_CHECK_FREQUENCY
    );

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Include refreshAccessToken in the dependency array

  return {
    setToken: saveToken,
    token,
    removeToken,
    username, // Include username in the returned object
  };
}

export default useToken;
