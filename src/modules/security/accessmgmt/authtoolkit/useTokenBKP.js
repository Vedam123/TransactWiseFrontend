import { useState, useEffect } from "react";
import { TOKEN_EXPIRATION_CHECK_FREQUENCY } from "../../../admin/setups/ConstDecl";


function useToken() {
  function getToken() {
    const userToken = localStorage.getItem("token");
    //console.log("The Local storage token : ", userToken);

    if (userToken) {
      console.log("The Local storage token : ", userToken);

      const payload = JSON.parse(atob(userToken.split(".")[1]));
      const expirationTime = new Date(payload.exp* 1000);
      const currentTime = new Date();
      console.log("Expiration time : ", expirationTime);
      console.log("Current Time : ", currentTime);

      if (expirationTime < currentTime) {
        console.log("Token has expired.");
        localStorage.removeItem("token");
      } else {
        console.log("Token is still valid.");
      }
    }

    return userToken;
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  }

  function removeToken() {
    localStorage.removeItem("token");
    //alert("Token removed")
    setToken(null);
  }

  useEffect(() => {
    function checkTokenExpiration() {
      console.log("Curren time now -->",new Date(),"Check the token expiry Automatically");
      const userToken = getToken();
      if (!userToken) {
        // Token has expired or is missing, perform necessary actions
        removeToken();
      }
    }

    // Check token expiration when the component mounts
    checkTokenExpiration();

    // Set up an interval to periodically check token expiration (e.g., every minute)
    const interval = setInterval(checkTokenExpiration, TOKEN_EXPIRATION_CHECK_FREQUENCY);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}

export default useToken;
