import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

export default function CreateCompanyForm() {
  const [formData, setFormData] = useState({
    group_company_id: "",
    name: "",
    description: "",
    local_cur: "",
    home_cur: "",
    reporting_cur: "",
  });

  const [groupCompanies, setGroupCompanies] = useState([]);
  const [loadingGroupCompanies, setLoadingGroupCompanies] = useState(true);

  const [currencies, setCurrencies] = useState([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userid,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleGroupCompanyChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      group_company_id: e.target.value,
    }));
  };

  const handleCurrencyChange = (e, currencyType) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [currencyType]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/create_company`,
        formData,
        { headers: generateHeaders() }
      );

      logger.info(`[${new Date().toLocaleTimeString()}] Company created successfully`, response.data);
      setSuccessMessage("Company created successfully");
      setFormData({
        group_company_id: "",
        name: "",
        description: "",
        local_cur: "",
        home_cur: "",
        reporting_cur: "",
      });
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error creating company`, error);
      setError("An error occurred while creating the company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGroupCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_group_companies`, {
          headers: generateHeaders(),
        });
        setGroupCompanies(response.data.group_company_list);
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching group companies:`, error);
      } finally {
        setLoadingGroupCompanies(false);
      }
    };

    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_currencies`, {
          headers: generateHeaders(),
        });
        setCurrencies(response.data.currencies);
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching currencies:`, error);
      } finally {
        setLoadingCurrencies(false);
      }
    };

    fetchGroupCompanies();
    fetchCurrencies();
  }, []);

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Company</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="name">Company Name:</label>
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
                  <label htmlFor="description">Description:</label>
                </div>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="group_company">Group Company:</label>
                </div>
                <select
                  id="group_company"
                  name="group_company"
                  value={formData.group_company_id}
                  onChange={handleGroupCompanyChange}
                  className="form-control input-field"
                >
                  <option value="" disabled>Select Group Company</option>
                  {loadingGroupCompanies ? (
                    <option value="" disabled>Loading Group Companies...</option>
                  ) : (
                    groupCompanies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="local_cur">Local Currency:</label>
                </div>
                <select
                  id="local_cur"
                  name="local_cur"
                  value={formData.local_cur}
                  onChange={(e) => handleCurrencyChange(e, "local_cur")}
                  className="form-control input-field"
                >
                  <option value="" disabled>Select Local Currency</option>
                  {loadingCurrencies ? (
                    <option value="" disabled>Loading Currencies...</option>
                  ) : (
                    currencies.map((currency) => (
                      <option key={currency.currencycode} value={currency.currencycode}>
                        {currency.currencyname} ({currency.currencycode})
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="home_cur">Home Currency:</label>
                </div>
                <select
                  id="home_cur"
                  name="home_cur"
                  value={formData.home_cur}
                  onChange={(e) => handleCurrencyChange(e, "home_cur")}
                  className="form-control input-field"
                >
                  <option value="" disabled>Select Home Currency</option>
                  {loadingCurrencies ? (
                    <option value="" disabled>Loading Currencies...</option>
                  ) : (
                    currencies.map((currency) => (
                      <option key={currency.currencycode} value={currency.currencycode}>
                        {currency.currencyname} ({currency.currencycode})
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="reporting_cur">Reporting Currency:</label>
                </div>
                <select
                  id="reporting_cur"
                  name="reporting_cur"
                  value={formData.reporting_cur}
                  onChange={(e) => handleCurrencyChange(e, "reporting_cur")}
                  className="form-control input-field"
                >
                  <option value="" disabled>Select Reporting Currency</option>
                  {loadingCurrencies ? (
                    <option value="" disabled>Loading Currencies...</option>
                  ) : (
                    currencies.map((currency) => (
                      <option key={currency.currencycode} value={currency.currencycode}>
                        {currency.currencyname} ({currency.currencycode})
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            {loading && <div className="loading-indicator">Creating...</div>}
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Company
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>You do not have permission to view this module</div>
        )}
      </div>
    </div>
  );
}
