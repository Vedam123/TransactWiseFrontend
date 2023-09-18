import React, { useEffect, useState, useCallback } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";

function ViewAllProdCatForm() {
  const [itemCategories, setItemCategories] = useState([]);
  const userPermissions = ModulePermissions({ moduleName: "products" }); // Fetch user permissions

  const fetchData = useCallback(async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'UserId': localStorage.getItem("userid"),
        // Add other headers if needed
      };

      const response = await axios.get(`${API_URL}/list_item_categories`, {
        headers: headers,
      });

      setItemCategories(response.data.item_categories);
    } catch (error) {
      console.error("Error fetching item categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check user permissions before rendering
  const canViewModule = userPermissions.canViewModule;

  if (!canViewModule) {
    // User doesn't have permission to view the module
    return <div>You do not have permission to view this module.</div>;
  }

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
