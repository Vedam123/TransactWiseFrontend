import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";

export default function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
   
    const logMeIn = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${API_URL}/login_user`, formData);
        const { userid,username, access_token } = response.data;
        props.onLoginSuccess(userid,username, access_token);
        setFormData({ username: "", password: "" });
        setError("");
      } catch (error) {
        setError("Invalid username or password");
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

