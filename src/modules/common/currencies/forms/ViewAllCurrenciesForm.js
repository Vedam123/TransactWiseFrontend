import React, { useEffect, useState } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";

function ViewAllCurrenciesForm() {
  const [currencies, setCurrencies] = useState([]);

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

  }, []); // Empty dependency array since fetchData doesn't have any dependencies

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
