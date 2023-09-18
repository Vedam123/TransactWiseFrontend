import React, { useEffect, useState } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";

function ViewAllUOMsForm() {
  const [uoms, setUOMs] = useState([]);

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
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUOMs(response.data.uom);
      } catch (error) {
        console.error("Error fetching UOMs:", error);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="child-container form-container">
      <h1 className="title">Unit of Measures</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-header">
            <th>UOM ID</th>
            <th>Abbreviation</th>
            <th>UOM Name</th>
            <th>Base Unit</th>
            <th>Conversion Factor</th>
            <th>Decimal Places</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {uoms.map((uom) => (
            <tr key={uom.uom_id} className="table-row">
              <td>{uom.uom_id}</td>
              <td>{uom.abbreviation}</td>
              <td>{uom.uom_name}</td>
              <td>{uom.base_unit || "N/A"}</td>
              <td>{uom.conversion_factor}</td>
              <td>{uom.decimal_places}</td>
              <td>{uom.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllUOMsForm;
