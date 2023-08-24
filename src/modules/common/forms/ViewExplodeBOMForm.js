import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../admin/setups/ConstDecl";
import "../../utilities/css/appcss.css";

function ViewExplodeBOMForm({ updateExplodedBOM }) {
  const [itemCode, setItemCode] = useState("");
  const [requiredQuantity, setRequiredQuantity] = useState("");
  const [explodedBOM, setExplodedBOM] = useState([]);
  const [itemList, setItemList] = useState([]); // State to store the list of items

  useEffect(() => {
    fetchItemList(); // Fetch the item list when the component mounts
  }, []);

  const fetchItemList = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_items`);
      setItemList(response.data.items);
    } catch (error) {
      alert("Error fetching item lists");
      console.error("Error fetching item list:", error);
    }
  };

  const handleItemCodeChange = (event) => {
    setItemCode(event.target.value);
  };

  const handleRequiredQuantityChange = (event) => {
    const quantity = event.target.value;
    if (quantity !== "" && parseInt(quantity) > 0) {
      setRequiredQuantity(quantity);
    } else {
      setRequiredQuantity("");
    }
  };

  const handleExplodeBOM = async () => {
    if (!itemCode) {
      alert("Please select an item.");
      return;
    }

    if (!requiredQuantity) {
      alert("Please select quanity as positive number.");
      return;
    }

    try {
      //alert(itemCode);
      //alert(requiredQuantity);
      const response = await axios.get(`${API_URL}/process_exploded_bom`, {
        params: {
          item_code: itemCode,
          required_quantity: requiredQuantity,
        },
      });

      if (response.data.processed_data) {
        updateExplodedBOM(response.data.processed_data);
      } else {
        updateExplodedBOM([]);
        alert("No data available for the Item .", itemCode);
      }
    } catch (error) {
      console.error("Error exploding BOM:", error);
      setExplodedBOM([]);
      alert("Error exploding BOM");
    }
  };

  return (
    <div className="child-container menu-container">
      <div className="child-container form-container">
        <div className="form-group  col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="itemCode">Item:</label>
            </div>
            {/* Replace this input field */}
            <select
              id="itemCode"
              value={itemCode}
              onChange={handleItemCodeChange}
              className="form-control input-field"
            >
              <option value="">Select an item code</option>
              {itemList.map((item) => (
                <option key={item.item_id} value={item.item_code}>
                  {item.item_code} - {item.item_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group  col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="requiredQuantity">Quantity:</label>
            </div>
            <input
              type="number"
              id="requiredQuantity"
              value={requiredQuantity}
              onChange={handleRequiredQuantityChange}
              className="form-control input-field"
            />
          </div>
        </div>
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <button onClick={handleExplodeBOM} className="btn btn-primary">
              Explode BOM
            </button>
          </div>
        </div>

        <table className="table table-striped table-bordered">
          {/* Render table headers here */}
          <tbody>
            {explodedBOM.map((item, index) => (
              <tr key={index} className="table-row">
                {/* Render table row data here */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewExplodeBOMForm;
