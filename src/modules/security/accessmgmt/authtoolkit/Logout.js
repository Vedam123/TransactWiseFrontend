import React from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function Logout(props) {
  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("loggedInUserid");

      // Define your headers here, including the Authorization and Userid headers
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Userid: userId,
      };

      await axios.post(`${API_URL}/logout_user`, null, { headers });

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

      props.token();

      // Log successful logout with username
      logger.info(`[${new Date().toLocaleTimeString()}] User ${localStorage.getItem("username")} logged out successfully.`);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }

      // Log logout error
      logger.error(`[${new Date().toLocaleTimeString()}] Error logging out:`, error);
    }
  };

  return (
    <div>
      {props.username && <p>Logged in as: {props.username}</p>}
      {props.token && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default Logout;
