import React, { useEffect, useState } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";

function ViewAllTaxCodesForm() {
  const [taxCodes, setTaxCodes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_tax_codes`);
      setTaxCodes(response.data.taxes);
    } catch (error) {
      console.error("Error fetching tax codes:", error);
    }
  };

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Tax Codes</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-header">
            <th className="table-header">Tax Code</th>
            <th>Tax Description</th>
            <th>Tax Type</th>
            <th>Tax Rate (%)</th>
            <th>Tax Applicability</th>
            <th>Tax Authority</th>
          </tr>
        </thead>
        <tbody>
          {taxCodes.map((tax) => (
            <tr key={tax.tax_id} className="table-row">
              <td>{tax.tax_code}</td>
              <td>{tax.tax_description}</td>
              <td>{tax.tax_type}</td>
              <td>{tax.tax_rate}</td>
              <td>{tax.tax_applicability}</td>
              <td>{tax.tax_authority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllTaxCodesForm;
