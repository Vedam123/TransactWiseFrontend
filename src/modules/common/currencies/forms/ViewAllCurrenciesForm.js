import React, { useEffect, useState } from "react";
import { API_URL,BACKEND_COMMON_MODULE_NAME,MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

function ViewAllCurrenciesForm() {
  const [currencies, setCurrencies] = useState([]);
  
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
        const response = await axios.get(`${API_URL}/list_currencies`, {
          headers: generateHeaders(),
        });
        setCurrencies(response.data.currencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchData(); // Include fetchData in the dependency array

  }, [hasRequiredAccess]); // Include hasRequiredAccess in the dependency array


  return (
    <div className="child-container form-container">
      <h1 className="title">List of Currencies</h1>
      {hasRequiredAccess ? ( <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-header">
            <th className="table-header">Currency Code</th>
            <th>Currency Name</th>
            <th>Currency Symbol</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.currencycode} className="table-row">
              <td>{currency.currencycode}</td>
              <td>{currency.currencyname}</td>
              <td>{currency.currencysymbol}</td>
            </tr>
          ))}
        </tbody>
      </table>  ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
}

export default ViewAllCurrenciesForm;
