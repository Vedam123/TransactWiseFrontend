import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import { ACCOUNT_TYPES } from  "../../config/config";
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import logger from "../../../utilities/Logs/logger";

export default function CreateAccountForm() {
  const [formData, setFormData] = useState({
    account_number: "",
    account_name: "",
    account_type: "",
    opening_balance: "",
    currency_code: "",
    bank_name: "",
    branch_name: "",
    account_holder_name: "",
    is_active: true,
    company_id: "",
    department_id: "",
  });

  const userPermissions = ModulePermissions({ moduleName: "finance" });

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const companiesResponse = await axios.get(`${API_URL}/get_companies`, {
          headers: generateHeaders(),
        });
        setCompanies(companiesResponse.data.company_list);

        const currenciesResponse = await axios.get(`${API_URL}/list_currencies`,{
          headers: generateHeaders(),
        });
        setCurrencies(currenciesResponse.data.currencies);
      } catch (error) {
        logger.error(`Error fetching data:`, error);
      }
    }

    fetchData();
  }, []);

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userId,
      // Add other headers if needed
    };
  };

  const handleCompanyChange = async (companyId) => {
    try {
      const response = await axios.get(`${API_URL}/get_departments?company_id=${companyId}`, {
        headers: generateHeaders(),
      });
      setDepartments(response.data.department_list);
    } catch (error) {
      logger.error(`Error fetching departments:`, error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    // Set current_balance to opening_balance
    if (e.target.name === "opening_balance") {
      setFormData((prevData) => ({
        ...prevData,
        current_balance: e.target.value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/create_account`, formData, {
        headers: generateHeaders(),
      });
      setSuccessMessage("Account created successfully!");
      setErrorMessage(""); // Clear error message if any
      console.log(response.data);
      setFormData({
        account_number: "",
        account_name: "",
        account_type: "",
        opening_balance: "",
        current_balance: "", // Set current_balance to an appropriate default value
        currency_code: "",
        bank_name: "",
        branch_name: "",
        account_holder_name: "",
        is_active: true,
        company_id: "",
        department_id: "",
      });
    } catch (error) {
      console.error("Error creating account:", error);
      setErrorMessage(`Error creating account: ${error.message}`);
      setSuccessMessage(""); // Clear success message if any
    }
  };

  // Check user permissions before rendering
  const canViewModule = userPermissions.canViewModule;

  if (!canViewModule) {
    // User doesn't have permission to view the module
    return <div>You do not have permission to view this module.</div>;
  }

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Account</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Account Number field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="account_number">Account Number:</label>
              </div>
              <input
                type="text"
                id="account_number"
                name="account_number"
                value={formData.account_number}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Account Name field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="account_name">Account Name:</label>
              </div>
              <input
                type="text"
                id="account_name"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Account Type field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="account_type">Account Type:</label>
              </div>
              <select
                id="account_type"
                name="account_type"
                value={formData.account_type}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Account Type</option>
                {ACCOUNT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Opening Balance field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="opening_balance">Opening Balance:</label>
              </div>
              <input
                type="text"
                id="opening_balance"
                name="opening_balance"
                value={formData.opening_balance}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Currency field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="currency_code">Currency:</label>
              </div>
              <select
                id="currency_code"
                name="currency_code"
                value={formData.currency_code}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Currency</option>
                {currencies.map((currency) => (
                  <option key={currency.currencycode} value={currency.currencycode}>
                    {currency.currencyname} ({currency.currencycode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Company field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="company_id">Company:</label>
              </div>
              <select
                id="company_id"
                name="company_id"
                value={formData.company_id}
                onChange={(e) => {
                  handleChange(e);
                  handleCompanyChange(e.target.value);
                }}
                className="form-control input-field"
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.company_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Department field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="department_id">Department:</label>
              </div>
              <select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.department_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit button */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </div>
          </div>
        </form>

        {/* Display success message */}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}
