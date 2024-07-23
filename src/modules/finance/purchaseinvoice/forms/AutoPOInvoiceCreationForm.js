import React, { useState } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { AUTO_PURCHASE_INVOICE_CONFIG } from "../../config/config";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function AutoPOInvoiceCreationForm() {
  const [formData, setFormData] = useState({
    purchase_order_numbers: ""
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
    const purchaseOrderNumbersArray = formData.purchase_order_numbers
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "")  // Filter out empty strings
      .map((num) => parseInt(num, 10));
  
    // Confirmation dialog if purchaseOrderNumbersArray is empty
    if (purchaseOrderNumbersArray.length === 0) {
      const userConfirmed = window.confirm(
        "Are you sure you want to create invoices for all purchase orders?"
      );
      if (!userConfirmed) {
        return;  // Exit if the user clicks "No"
      }
    }
  
    const requestData = {
      purchase_order_numbers: purchaseOrderNumbersArray,
      ...AUTO_PURCHASE_INVOICE_CONFIG
    };
  
    try {
      const response = await axios.post(
        `${API_URL}/auto_create_po_pi`,
        requestData,
        {
          headers: generateHeaders(),
        }
      );
      console.log(response.data);
  
      // Set the success message from header_response
      setSuccessMessage(response.data.invoices[0].header_response.message);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error creating purchase invoice:", error);
      setErrorMessage(
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while creating the purchase invoice."
      );
      setSuccessMessage(null);
    }
  };
  
  return (
    <div className="child-container menu-container">
      <h2 className="title">Auto Create Purchase Invoice</h2>

      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="purchase_order_numbers">Purchase Order Numbers:</label>
                </div>
                <input
                  type="text"
                  id="purchase_order_numbers"
                  name="purchase_order_numbers"
                  value={formData.purchase_order_numbers}
                  onChange={handleChange}
                  className="form-control input-field"
                  placeholder="Enter purchase order numbers separated by commas"
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
          You do not have permission to create a purchase order invoice.
        </div>
      )}
    </div>
  );
}
