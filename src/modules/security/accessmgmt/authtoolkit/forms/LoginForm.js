import React, { useState } from "react";
import axios from "axios";

import { API_URL,USER_STATUS  } from "../../../../admin/setups/ConstDecl";
import "../../../../utilities/css/appcss.css";
import UpdateCredentialsForm from "./UpdateCredentialsForm";

import logger from "../../../../utilities/Logs/logger"; // Import your logger module here

function convertTimestampToDateTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
;

export default function LoginForm(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instance: "",
  });
  const [showUpdateCredentialsForm, setShowUpdateCredentialsForm] = useState(false)
  const [error, setError] = useState("");

  const logMeIn = async (e) => {
    e.preventDefault();

    try {
      const statusWithShortName = USER_STATUS.find((status) => status.short_name === "ACTIVE");
      const updatedFormData = { ...formData, name: statusWithShortName ? statusWithShortName.name : "" };
      const response = await axios.post(`${API_URL}/login_user`, updatedFormData);

      const {
        userid,
        username,
        access_token,
        refresh_token,
        name,
        emp_img,
        token_expires_delta,
        refresh_token_expires_delta,
      } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("loggedInUserid", userid);
      localStorage.setItem("name", name);
      localStorage.setItem("emp_img", emp_img);
      localStorage.setItem("username", username);
      localStorage.setItem("token_expires_delta", token_expires_delta);

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expirationTimestamp = currentTimestamp + token_expires_delta;
      const token_expires_by = convertTimestampToDateTime(expirationTimestamp);
      logger.info(`[${new Date().toLocaleTimeString()}] Token expired by ${token_expires_by}`);
      localStorage.setItem("token_expires_by", token_expires_by);

      localStorage.setItem("refresh_token_expires_delta", refresh_token_expires_delta);
      const rexpirationTimestamp = currentTimestamp + refresh_token_expires_delta;
      const refresh_token_expires_by = convertTimestampToDateTime(rexpirationTimestamp);
      localStorage.setItem("refresh_token_expires_by", refresh_token_expires_by);
      logger.info(`[${new Date().toLocaleTimeString()}] Refresh token expired by ${refresh_token_expires_by}`);
      logger.info(`[${new Date().toLocaleTimeString()}] Token Expires Delta ${token_expires_delta}`);
      logger.info(`[${new Date().toLocaleTimeString()}] Refresh token expires delta ${refresh_token_expires_delta}`);

      props.onLoginSuccess(userid, username, access_token, refresh_token, name, emp_img);

      setFormData({ username: "", password: "", instance: "" });
      setError("");

      logger.info(`[${new Date().toLocaleTimeString()}] User ${username} logged in successfully.`);
    } catch (error) {
      setError("Invalid username or password");
      logger.error(`[${new Date().toLocaleTimeString()}] Error logging in:`, error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleForgotPassword = () => {
    // Set the state to show UpdateCredentialsForm
    setError("");
    setShowUpdateCredentialsForm(true);
  };

  return (
    <div className="child-container menu-container">

      {error && <div>{error}</div>}
      <div className="child-container form-container">
      {showUpdateCredentialsForm ? (
          // If showUpdateCredentialsForm is true, display UpdateCredentialsForm
          <UpdateCredentialsForm />
        ) : (
        <form onSubmit={logMeIn}>
          <div className="form-group col-md-6 mb-2">
          <h3 className="title">Login </h3>
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

          <div className="form-group col-md-6 mb-2">
              <div className="form-row">
              <div className="label-container">
                <label htmlFor="username">Instance:</label>
              </div>
              <input
                type="text"
                id="instance"
                name="instance"
                value={formData.instance}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          
          <button type="submit">Login</button>
          <button type="button" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
        </form>
            )}
      </div>
    </div>
  );
}
