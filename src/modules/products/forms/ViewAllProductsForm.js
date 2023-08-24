import React, { useEffect, useState } from "react";
import { API_URL } from "../../admin/setups/ConstDecl";
import axios from "axios";
import "../../utilities/css/appcss.css";

function ViewAllProductsForm() {
  const [items, setItems] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [uomAbbreviations, setUomAbbreviations] = useState({});

  useEffect(() => {
    fetchData();
    fetchCategoryNames();
    fetchUomAbbreviations();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_items`);
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchUomAbbreviations = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_uoms`);
      const uomList = response.data.uom;
      const uomAbbreviationMap = {};
      uomList.forEach((uom) => {
        uomAbbreviationMap[uom.uom_id] = uom.abbreviation;
      });
      setUomAbbreviations(uomAbbreviationMap);
    } catch (error) {
      console.error("Error fetching UOM abbreviations:", error);
    }
  };

  const fetchCategoryNames = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_item_categories`);
      const categories = response.data.item_categories;
      const categoryMapData = {};
      categories.forEach((category) => {
        categoryMapData[category.category_id] = category.category_name;
      });
      setCategoryMap(categoryMapData);
    } catch (error) {
      console.error("Error fetching category names:", error);
    }
  };

  return (
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
  );
}

export default ViewAllProductsForm;
