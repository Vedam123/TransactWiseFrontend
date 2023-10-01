import React, { useEffect, useState } from "react";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

function ViewAllExchangeRatesForm() {
  const [exchangeRates, setExchangeRates] = useState([]);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userId,
      // Add other headers if needed
    };
  };

  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_exchange_rates`, {
          headers: generateHeaders(),
        });
        setExchangeRates(response.data.exchangerates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchData();

  }, [hasRequiredAccess]); // Include hasRequiredAccess in the dependency array


  return (
    <div className="child-container form-container">
      <h1 className="title">List of Exchange Rates</h1>
      {hasRequiredAccess ? (<table className="table table-striped table-bordered">
        <thead>
          <tr className="table-header">
            <th className="table-header">From Currency</th>
            <th>To Currency</th>
            <th>Exchange Rate</th>
            <th>Exchange Rate Date</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate) => (
            <tr key={`${rate.fromcurrency}-${rate.tocurrency}`} className="table-row">
              <td>{rate.fromcurrency}</td>
              <td>{rate.tocurrency}</td>
              <td>{rate.exchangerate}</td>
              <td>{rate.exchangeratedate}</td>
            </tr>
          ))}
        </tbody>
      </table> 
      ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
}

export default ViewAllExchangeRatesForm;
