import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

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

      const { userid, username, access_token, refresh_token, name, emp_img } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("loggedInUserid", userid);
      localStorage.setItem("name", name);
      localStorage.setItem("emp_img", emp_img);
      localStorage.setItem("username", username);

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
