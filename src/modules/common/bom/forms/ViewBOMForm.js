import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_COMMON_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

function ViewBOMForm({
  updateExplodedBOM,
  bomByDescriptions,
  setBOMByDescriptions,
}) {
  const [ModelItem, setModelItem] = useState("");
  const [ModelItemCode, setModelItemCode] = useState("");
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      logger.warn(
        `[${new Date().toLocaleTimeString()}] Access denied to View BOM component.`
      );
      return;
    }

    fetchItemList();
  }, [hasRequiredAccess, bomByDescriptions]);

  const fetchItemList = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/list_bom`, { headers });
      setItemList(response.data.bom_list);
      setLoading(false);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching item lists:`,
        error
      );
      setError(error);
      setLoading(false);
    }
  };

  const handleModelItemCodeChange = (event) => {
    setModelItemCode(event.target.value);
    // When a ModelItem_code is selected, find its corresponding ModelItem
    const selectedModelItem = itemList.find(
      (item) => item.ModelItem_code === event.target.value
    );
    if (selectedModelItem) {
      setModelItem(selectedModelItem.ModelItem);
    }
  };

  const handleCheckboxChange = () => {
    setBOMByDescriptions(!bomByDescriptions);
    console.log("Checkbox state:", !bomByDescriptions);
  };

  const handleBOM = async () => {
    if (!ModelItemCode) {
      logger.warn(
        `[${new Date().toLocaleTimeString()}] No Model code selected.`
      );
      alert("Please select a Model");
      return;
    }

    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/list_bom`, {
        headers,
        params: {
          model_item: ModelItem,
        },
      });

      //console.log("After button pressed ", response.data.bom_list);
      console.log("Before sending to upDateExplodeBOM ", bomByDescriptions);
      if (response.data.bom_list) {
        //updateExplodedBOM(response.data.bom_list);
        updateExplodedBOM(response.data.bom_list);
      } else {
        logger.warn(
          `[${new Date().toLocaleTimeString()}] No data available for Item: ${ModelItem}`
        );
        updateExplodedBOM([]);
        alert("No data available for the Model.");
      }
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching BOM data:`,
        error
      );
      alert("Error in BOM");
    }
  };

  if (!hasRequiredAccess) {
    return <div>You do not have permission to view this module</div>;
  }

  const uniqueItemList = Array.from(
    new Set(
      bomByDescriptions
        ? itemList.map((item) => item.ModelItem_name)
        : itemList.map((item) => item.ModelItem_code)
    )
  ).map((modelItem) =>
    bomByDescriptions
      ? itemList.find((item) => item.ModelItem_name === modelItem)
      : itemList.find((item) => item.ModelItem_code === modelItem)
  );

  return (
    <div className="child-container menu-container">
      <div className="child-container form-container">
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <label>
              BOM by descriptions
              <input
                type="checkbox"
                checked={bomByDescriptions}
                onChange={handleCheckboxChange}
              />
            </label>
            ;
          </div>
        </div>
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="ModelItemCode">Model Item Code:</label>
            </div>
            <select
              id="ModelItemCode"
              value={ModelItemCode}
              onChange={handleModelItemCodeChange}
              className="form-control input-field"
            >
              {loading ? (
                <option value="" disabled>
                  Loading...
                </option>
              ) : error ? (
                <option value="" disabled>
                  Error loading items
                </option>
              ) : uniqueItemList.length === 0 ? (
                <option value="" disabled>
                  No items available
                </option>
              ) : (
                <>
                  <option value="">Select Model Item Code</option>
                  {uniqueItemList.map((item) => (
                    <option
                      key={
                        bomByDescriptions
                          ? item.ModelItem_name
                          : item.ModelItem_code
                      }
                      value={item.ModelItem_code}
                    >
                      {bomByDescriptions
                        ? item.ModelItem_name
                        : item.ModelItem_code}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <button onClick={handleBOM} className="btn btn-primary">
              BOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBOMForm;
