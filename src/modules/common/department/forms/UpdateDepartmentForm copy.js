import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import { useLocation } from "react-router-dom";
import "../../../utilities/css/appcss.css";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

export default function UpdateDepartmentForm() {
  const location = useLocation();
  const { departmentNumber } = location.state || {}; // Access departmentNumber from hidden state

  const [formData, setFormData] = useState({
    company_id: "",
    department_name: "",
    manager_id: "", // Initially empty
    description: "",
    default_account_header_id: "",
  });

  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const fetchDepartmentDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_departments?id=${departmentNumber}`, {
        headers: generateHeaders(),
      });
      if (response.data && response.data.department_list && response.data.department_list.length > 0) {
        const department = response.data.department_list[0];

        logger.debug(" fetching department details:", department);

        // Set formData with the department details
        setFormData({
          company_id: department.company_id || "",
          department_name: department.department_name || "",
          manager_id: department.manager_id || "",
          description: department.description || "",
          default_account_header_id: department.default_account_header_name || "",
        });

      } else {
        setError("Department not found.");
        logger.error("Error fetching department details:", error);
      }
    } catch (error) {
      logger.error("Error fetching department details:", error);
      setError("Failed to fetch department details.");
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_companies`, {
        headers: generateHeaders(),
      });
      setCompanies(response.data.company_list);
    } catch (error) {
      logger.error(`Error fetching companies:`, error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const status = 1; // Only active employees
      const response = await axios.get(`${API_URL}/employee?status=${status}`, {
        headers: generateHeaders(),
      });
      setEmployees(response.data); // Assuming the employee data is an array
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching employees:`, error);
    }
  };

  useEffect(() => {
    // Fetch department, companies, and employees concurrently
    const fetchData = async () => {
      try {
        // Fetching all data concurrently
        await Promise.all([fetchCompanies(), fetchEmployees(), fetchDepartmentDetails()]);
      } catch (error) {
        logger.error("Error fetching all data:", error);
      }
    };

    fetchData();
  }, [departmentNumber]); // This effect runs once when the departmentNumber changes


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsFormDirty(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedDepartmentData = {
      company_id: formData.company_id,
      department_name: formData.department_name,
      manager_id: formData.manager_id,
      description: formData.description,
      default_account_header_id: formData.default_account_header_id,
    };

    try {
      const response = await axios.put(`${API_URL}/update_department`, updatedDepartmentData, {
        "Content-Type": "application/json",
        headers: generateHeaders(),
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
      } else {
        setError(response.data.error);
      }
      setIsFormSubmitted(true);
      setIsFormDirty(false);
    } catch (error) {
      setError("An error occurred while updating the department.");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Update Department {departmentNumber}</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleFormSubmit}>
            {/* Company Field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="company_id">Company Name:</label>
                </div>
                <select
                  id="company_id"
                  name="company_id"
                  className="form-control input-field"
                  value={formData.company_id || ""}
                  onChange={handleChange}
                >
                  <option value="">--Select Company--</option>
                  {companies.map((company, index) => (
                    <option key={`${company.company_id}-${index}`} value={company.company_id}>
                      {company.company_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Department Name Field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="department_name">Department Name:</label>
                </div>
                <input
                  type="text"
                  id="department_name"
                  name="department_name"
                  className="form-control input-field"
                  value={formData.department_name || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Manager Field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="manager_id">Manager</label>
                </div>
                <select
                  id="manager_id"
                  name="manager_id"
                  className="form-control input-field"
                  value={formData.manager_id || ""}
                  onChange={handleChange}
                >
                  <option value="">--Select Manager--</option>
                  {employees.map((emp, index) => (
                    <option key={`${emp.empid}-${index}`} value={emp.empid}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Default Account Header Field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="default_account_header_id">Default Account Header ID:</label>
                </div>
                <input
                  type="text"
                  id="default_account_header_id"
                  name="default_account_header_id"
                  className="form-control input-field"
                  value={formData.default_account_header_id || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-group col-md-6 mb-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isFormDirty || isFormSubmitted}
              >
                Submit
              </button>
            </div>
          </form>
          {/* Display Success Message */}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

          {/* Display Error Message */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      ) : (
        <p>You do not have the required access to update a department.</p>
      )}
    </div>
  );
}
