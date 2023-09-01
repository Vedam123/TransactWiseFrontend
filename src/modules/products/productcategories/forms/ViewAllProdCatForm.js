import React, { useEffect, useState } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";

function ViewAllProdCatForm() {
  const [itemCategories, setItemCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_item_categories`);
      setItemCategories(response.data.item_categories);
    } catch (error) {
      console.error("Error fetching item categories:", error);
    }
  };

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Item Categories</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-header">
            <th className="table-header">Category ID</th>
            <th>Category Name</th>
            <th>Default UOM</th>
            <th>Description</th>
            <th>Tax %</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {itemCategories.map((category) => (
            <tr key={category.category_id} className="table-row">
              <td>{category.category_id}</td>
              <td>{category.category_name}</td>
              <td>{category.default_uom}</td>
              <td>{category.description}</td>
              <td>{category.tax_information}</td>
              <td>
                  {category.image && (
                    <img
                      src={`data:image/png;base64,${category.image}`}
                      alt="Category Info"
                      className="employee-pic"
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

export default ViewAllProdCatForm;
