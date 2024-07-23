import React, { useState } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { AUTO_SALES_INVOICE_CONFIG } from "../../config/config";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function AutoCreateInvoiceFromSOForm() {
  const [formData, setFormData] = useState({
    sales_order_numbers: ""
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert empty input to an empty array
    const salesOrderNumbersArray = formData.sales_order_numbers
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "")  // Filter out empty strings
      .map((num) => parseInt(num, 10));
  
    // Confirmation dialog if salesOrderNumbersArray is empty
    if (salesOrderNumbersArray.length === 0) {
      const userConfirmed = window.confirm(
        "Are you sure you want to create invoices for all sales orders?"
      );
      if (!userConfirmed) {
        return;  // Exit if the user clicks "No"
      }
    }
  
    const requestData = {
      sales_order_numbers: salesOrderNumbersArray,
      created_by: localStorage.getItem("userid"),  // Add this if needed
      ...AUTO_SALES_INVOICE_CONFIG
    };
  
    try {
      const response = await axios.post(
        `${API_URL}/auto_create_so_si`,
        requestData,
        {
          headers: generateHeaders(),
        }
      );
      console.log(response.data);
      const responseData = response.data[0];
  
      // Set the success message from header_response
      setSuccessMessage(responseData.header_response.message);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error creating sales invoice:", error);
      setErrorMessage(
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while creating the sales invoice."
      );
      setSuccessMessage(null);
    }
  };
  
  

 /* const handleSubmit = async (e) => {
    e.preventDefault();


     // Convert empty input to an empty array
    const salesOrderNumbersArray = formData.sales_order_numbers
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "")  // Filter out empty strings
      .map((num) => parseInt(num, 10));

    const salesOrderNumbersArray = formData.sales_order_numbers
      .split(",")
      .map((num) => parseInt(num.trim()));

    const requestData = {
      sales_order_numbers: salesOrderNumbersArray,
      ...AUTO_SALES_INVOICE_CONFIG
    };

    try {
      const response = await axios.post(
        `${API_URL}/auto_create_so_si`,
        requestData,
        {
          headers: generateHeaders(),
        }
      );
      console.log(response.data)
      const responseData = response.data[0];

      // Set the success message from header_response
      setSuccessMessage(responseData.header_response.message);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error creating sales invoice:", error);
      setErrorMessage(
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while creating the sales invoice."
      );
      setSuccessMessage(null);
    }
  };*/

  return (
    <div className="child-container menu-container">
      <h2 className="title">Auto Create Sales Order Invoice</h2>

      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="sales_order_numbers">Sales Order Numbers:</label>
                </div>
                <input
                  type="text"
                  id="sales_order_numbers"
                  name="sales_order_numbers"
                  value={formData.sales_order_numbers}
                  onChange={handleChange}
                  className="form-control input-field"
                  placeholder="Enter sales order numbers separated by commas"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
          {successMessage && (
            <div className="success-message">
              <p>{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          You do not have permission to create a sales order invoice.
        </div>
      )}
    </div>
  );
}