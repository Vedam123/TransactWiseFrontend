import React, { useState } from "react";
import axios from "axios";
import { API_URL,SUPER_USERS_COUNT } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";

export default function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Function to fetch employee name by empid
  const find_employee_name = async (empid) => {
    try {
      const response = await axios.get(`${API_URL}/employee`);
      const employees = response.data;

      // Check if empid is present in the response data
      const employee = employees.find((employee) => employee.empid === empid);
      console.log("Employee --> ",employee);
      if (employee) {
        console.log("Return Employee Name after login ",employee.name);
        return employee.name;
      } else if (empid <= SUPER_USERS_COUNT) {
        return "Super User";
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching employee name:", error);
      return null;
    }
  };

  const logMeIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_URL}/login_user`, formData);
      const { userid, username, access_token, refresh_token, empid, name } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("loggedInUsername", username);
      localStorage.setItem("loggedInUserid", userid);
      localStorage.setItem("name", name);
  
      console.log("Employee id ", empid);
  
      const employeeName = await find_employee_name(empid);
      console.log("Fetched employee name", employeeName);
  
      props.onLoginSuccess(userid, username, access_token, refresh_token, name);
  
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
