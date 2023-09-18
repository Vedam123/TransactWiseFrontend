import React, { useEffect, useState } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";

function ViewAllExchangeRatesForm() {
  const [exchangeRates, setExchangeRates] = useState([]);

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
        const response = await axios.get(`${API_URL}/list_exchange_rates`, {
          headers: generateHeaders(),
        });
        setExchangeRates(response.data.exchangerates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Exchange Rates</h1>
      <table className="table table-striped table-bordered">
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
    </div>
  );
}

export default ViewAllExchangeRatesForm;
