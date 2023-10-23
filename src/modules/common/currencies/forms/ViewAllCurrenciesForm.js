import React, { useEffect, useState } from "react";
import axios from "axios";
//import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import { API_URL } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
//import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function
import logger from "../../../utilities/Logs/logger";

function ViewAllCurrenciesForm() {
  const [currencies, setCurrencies] = useState([]);

  // Log a message when entering the ViewAllCurrenciesForm component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered ViewAllCurrenciesForm`);

 /* const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );*/

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userId,
      // Add other headers if needed
    };
  };

  const fetchData = async () => {
    console.log("FETCH DATA CALL START --- START ");
    try {
      const response = await axios.get(`${API_URL}/list_currencies`, {
      headers: generateHeaders(),
      });
      setCurrencies(response.data.currencies);
      logger.info(`[${new Date().toLocaleTimeString()}] Currencies data fetched successfully`);
      console.log("FETCH DATA CALL END --- END ");
    } catch (error) {
      logger.error("Error fetching currencies:", error);
      console.log("FETCH DATA CALL END --- END ");
    }
  };

  useEffect(() => {
    logger.debug(`[${new Date().toLocaleTimeString()}] useEffect triggered in ViewAllCurrenciesForm`);
  
    fetchData(); // Call fetchData when the component is mounted
  
    // eslint-disable-next-line
  }, []); // Empty dependency array to mimic componentDidMount behavior
  

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Currencies</h1>
        <table className="table table-striped table-bordered">
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
        </table>
         </div>
  );
}

export default ViewAllCurrenciesForm;
