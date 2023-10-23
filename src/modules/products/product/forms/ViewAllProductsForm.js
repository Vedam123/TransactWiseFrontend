import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, BACKEND_PRODUCT_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function ViewAllProductsForm() {
  const [items, setItems] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [uomAbbreviations, setUomAbbreviations] = useState({});
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_PRODUCT_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
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
        const response = await axios.get(`${API_URL}/list_items`, {
          headers: generateHeaders(),
        });
        setItems(response.data.items);
        // Log the successful data fetch with timestamp
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched items data.`);
      } catch (error) {
        // Log the error with timestamp
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching items:`, error);
      }
    };

    const fetchUomAbbreviations = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        const uomList = response.data.uom;
        const uomAbbreviationMap = {};
        uomList.forEach((uom) => {
          uomAbbreviationMap[uom.uom_id] = uom.abbreviation;
        });
        setUomAbbreviations(uomAbbreviationMap);
        // Log the successful data fetch with timestamp
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched UOM abbreviations.`);
      } catch (error) {
        // Log the error with timestamp
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching UOM abbreviations:`, error);
      }
    };

    const fetchCategoryNames = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_item_categories`, {
          headers: generateHeaders(),
        });
        const categories = response.data.item_categories;
        const categoryMapData = {};
        categories.forEach((category) => {
          categoryMapData[category.category_id] = category.category_name;
        });
        setCategoryMap(categoryMapData);
        // Log the successful data fetch with timestamp
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched category names.`);
      } catch (error) {
        // Log the error with timestamp
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching category names:`, error);
      }
    };

    fetchData();
    fetchUomAbbreviations();
    fetchCategoryNames();
  }, [hasRequiredAccess]);

  return (
    hasRequiredAccess ? (
      <div className="child-container form-container">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th className="table-header">Item Code</th>
              <th>Item Name</th>
              <th>Category Name</th>
              <th>Manufacturer</th>
              <th>Unit Price</th>
              <th>Default UOM</th>
              <th>Stock Quantity</th>
              <th>Product Type</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.item_id} className="table-row">
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{categoryMap[item.category_id] || "Unknown Category"}</td>
                <td>{item.manufacturer}</td>
                <td>{item.unit_price}</td>
                <td>{uomAbbreviations[item.default_uom_id] || "Unknown UOM"}</td>
                <td>{item.stock_quantity}</td>
                <td>{item.product_type}</td>
                <td>
                  {item.item_image && (
                    <img
                      src={`data:image/jpeg;base64,${item.item_image}`}
                      alt={`Item ${item.item_name}`}
                      className="item-image"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div> You do not have permission to view this module </div>
    )
  );
}

export default ViewAllProductsForm;
