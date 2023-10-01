import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_EMPLOYEE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../admin/setups/ConstDecl"; // Import your constants
import "../../utilities/css/appcss.css";
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

export default function CreateEmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    doj: "",
    manager: "",
    supervisor: "",
    role: "",
    salary: "",
    pic: null,
  });

  const [managerOptions, setManagerOptions] = useState([]);
  const [supervisorOptions, setSupervisorOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_EMPLOYEE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    const fetchEmployees = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const userid = localStorage.getItem("loggedInUserid");

        const headers = {
          Authorization: `Bearer ${authToken}`,
          UserId: userid,
        };

        const response = await axios.get(`${API_URL}/employee`, { headers });
        const employees = response.data;
        setManagerOptions(employees);
        setSupervisorOptions(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const userid = localStorage.getItem("loggedInUserid");

        const headers = {
          Authorization: `Bearer ${authToken}`,
          UserId: userid,
        };

        const response = await axios.get(`${API_URL}/designations`, {
          headers,
        });
        const designations = response.data;
        const designationNames = designations.map(
          (designation) => designation.designation_name
        );
        setDesignationOptions(designationNames);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchEmployees();
    fetchDesignations();
  }, [hasRequiredAccess]);

  const handleChange = (e) => {
    if (e.target.name === "pic") {
      setFormData({ ...formData, pic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("doj", formData.doj);
      formDataToSend.append("manager", formData.manager);
      formDataToSend.append("supervisor", formData.supervisor);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("salary", formData.salary);
      formDataToSend.append("pic", formData.pic);

      const response = await axios.post(
        `${API_URL}/create_employee`,
        formDataToSend,
        { headers }
      );
      console.log(response.data);
      setFormData({
        name: "",
        dob: "",
        doj: "",
        manager: "",
        supervisor: "",
        role: "",
        salary: "",
        pic: null,
      });
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Employee</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="name">Name:</label>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="dob">Date of Birth:</label>
                </div>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="doj">Date of Joining:</label>
                </div>
                <input
                  type="date"
                  id="doj"
                  name="doj"
                  value={formData.doj}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* Manager LOV */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="manager">Manager:</label>
                </div>
                <select
                  id="manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Manager</option>
                  {managerOptions.map((employee) => (
                    <option key={employee.empid} value={employee.empid}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Supervisor LOV */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="supervisor">Supervisor:</label>
                </div>
                <select
                  id="supervisor"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Supervisor</option>
                  {supervisorOptions.map((employee) => (
                    <option key={employee.empid} value={employee.empid}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Designation LOV */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="role">Designation:</label>
                </div>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Designation</option>
                  {designationOptions.map((designationName, index) => (
                    <option key={index} value={designationName}>
                      {designationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Salary */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="salary">Salary:</label>
                </div>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* Picture */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="pic">Picture:</label>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    id="pic"
                    name="pic"
                    onChange={handleChange}
                    className="custom-file-input"
                  />
                  {formData.pic && (
                    <img
                      src={URL.createObjectURL(formData.pic)}
                      alt="Selected Pic"
                      className="selected-pic"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Employee
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div> You do not have permission to view this module </div>
        )}
      </div>
    </div>
  );
}
