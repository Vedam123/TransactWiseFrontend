import { useState } from "react";

function useToken() {
  function getToken() {
    const userToken = localStorage.getItem("token");
    console.log("The Local storage token : ", userToken);

    if (userToken) {
      const payload = JSON.parse(atob(userToken.split(".")[1]));
      const expirationTime = new Date(payload.exp * 1000);
      const currentTime = new Date();
      console.log("Expiration time : ", expirationTime);
      console.log("Current Time : ", currentTime);

      if (expirationTime < currentTime) {
        console.log("Token has expired.");
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

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}

export default useToken;
