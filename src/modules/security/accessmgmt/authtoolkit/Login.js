import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function convertTimestampToDateTime(timestamp) {
  // Create a Date object using the provided timestamp
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  // Extract various components of the date and time
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Return the formatted date and time as a string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const logMeIn = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        // Add headers here, for example, Authorization header
        // 'Authorization': `Bearer ${yourAccessToken}`,
      };

      const response = await axios.post(
        `${API_URL}/login_user`,
        formData,
        {
          headers: headers,
        }
      );

      const { userid, username, access_token, refresh_token, name, emp_img ,token_expires_delta,refresh_token_expires_delta} = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("loggedInUserid", userid);
      localStorage.setItem("name", name);
      localStorage.setItem("emp_img", emp_img);
      localStorage.setItem("username", username);
      localStorage.setItem("token_expires_delta", token_expires_delta);
      const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
      const expirationTimestamp = currentTimestamp + token_expires_delta;
      const token_expires_by = convertTimestampToDateTime(expirationTimestamp)
      logger.info(`[${new Date().toLocaleTimeString()}] Token expipred by ${token_expires_by}`);
      localStorage.setItem("token_expires_by",token_expires_by);
      localStorage.setItem("refresh_token_expires_delta", refresh_token_expires_delta);
      const rexpirationTimestamp = currentTimestamp + refresh_token_expires_delta;
      const refresh_token_expires_by = convertTimestampToDateTime(rexpirationTimestamp)
      localStorage.setItem("refresh_token_expires_by",refresh_token_expires_by);
      logger.info(`[${new Date().toLocaleTimeString()}] Refresh token expipred by ${refresh_token_expires_by}`);
      logger.info(`[${new Date().toLocaleTimeString()}] Token Expires Delta ${token_expires_delta}`);
      logger.info(`[${new Date().toLocaleTimeString()}] Refresh token expires delta ${refresh_token_expires_delta}`);

      props.onLoginSuccess(
        userid,
        username,
        access_token,
        refresh_token,
        name,
        emp_img
      );

      setFormData({ username: "", password: "" });
      setError("");

      // Log successful login with username
      logger.info(`[${new Date().toLocaleTimeString()}] User ${username} logged in successfully.`);
    } catch (error) {
      setError("Invalid username or password");

      // Log login error
      logger.error(`[${new Date().toLocaleTimeString()}] Error logging in:`, error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Login</h2>
      {error && <div>{error}</div>}
      <div className="child-container form-container">
        <form onSubmit={logMeIn}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="username">Username:</label>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="password">Password:</label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>
          <button onClick={logMeIn}>Login</button>
        </form>
      </div>
    </div>
  );
}
