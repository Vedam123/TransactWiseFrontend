import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenExpiration } from "./checkTokenExpiration";
//import Login from "./Login";

function TokenExpirationChecker() {
  const token_expires_by = localStorage.getItem("token_expires_by");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkTokenExpiration(token_expires_by)) {
        // Remove items from local storage
        const keysToRemove = [
          "token",
          "refresh_token",
          "name",
          "emp_img",
          "username",
          "loggedInUserid",
          "currenciesDataFetched",
          "loglevel",
          "token_expires_delta",
          "token_expires_by",
          "refresh_token_expires_delta",
          "refresh_token_expires_by",
        ];

        keysToRemove.forEach((key) => {
          if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
          }
        });

        // Navigate to Login page
        //navigate("/Login");

        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token_expires_by, navigate]);

  return null;
}

export default TokenExpirationChecker;
