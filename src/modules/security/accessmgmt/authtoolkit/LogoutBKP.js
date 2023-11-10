import React from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function Logout(props) {
  function logMeOut() {
    const userId = localStorage.getItem("loggedInUserid");

    // Define your headers here, including the Authorization and Userid headers
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Userid: userId,
    };

    axios({
      method: "POST",
      url: `${API_URL}/logout_user`,
      headers: headers,
    })
      .then((response) => {
        props.token();

        const userToken = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refresh_token");
        const empname = localStorage.getItem("name");
        const emp_img = localStorage.getItem("emp_img");
        const username = localStorage.getItem("username");
        const loggedInUserid = localStorage.getItem("loggedInUserid");
        const currenciesDataFetched = localStorage.getItem("currenciesDataFetched");
        const loglevel = localStorage.getItem("loglevel");

        if (userToken) {
          localStorage.removeItem("token");
        }
        if (refreshToken) {
          localStorage.removeItem("refresh_token");
        }
        if (empname) {
          localStorage.removeItem("name");
        }
        if (emp_img) {
          localStorage.removeItem("emp_img");
        }
        if (username) {
          localStorage.removeItem("username");
        }
        if (loggedInUserid) {
          localStorage.removeItem("loggedInUserid");
        }
        if (currenciesDataFetched) {
          localStorage.removeItem("currenciesDataFetched");
        }
        if (loglevel) {
          localStorage.removeItem("loglevel");
        }

        // Log successful logout with username
        logger.info(`[${new Date().toLocaleTimeString()}] User ${username} logged out successfully.`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }

        // Log logout error
        logger.error(`[${new Date().toLocaleTimeString()}] Error logging out:`, error);
      });
  }

  return (
    <div>
      {props.username && <p>Logged in as: {props.username}</p>}
      {props.token && <button onClick={logMeOut}>Logout</button>}
    </div>
  );
}

export default Logout;
