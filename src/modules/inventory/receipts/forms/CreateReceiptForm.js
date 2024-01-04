import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import { RECEIPT_TYPES, RECEIPT_STATUS } from "../../config/config";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function
import {
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";

export default function CreateReceiptForm() {
  const [formData, setFormData] = useState({
    receiving_location_id: "",
    quantity: 0,
    uom_id: "",
    comments: "",
    item_id: "",
    receipt_name: "",
    inspect: false,
    transaction_number: 0,
    status: "",
    inspection_location_id: null, // Added inspection_location_id
    type_short: "",
  });

  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch items
        const itemsResponse = await axios.get(`${API_URL}/list_items`, {
          headers: generateHeaders(),
        });
        setItems(itemsResponse.data.items);

        // Fetch UOMs
        const uomsResponse = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUoms(uomsResponse.data.uom);

        // Fetch locations
        const locationsResponse = await axios.get(`${API_URL}/get_locations`, {
          headers: generateHeaders(),
        });
        setLocations(locationsResponse.data.location_list);
      } catch (error) {
        logger.error(`Error fetching data:`, error);
      }
    }

    fetchData();
  }, []);

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update form data based on the field type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    const selectedStatus = RECEIPT_STATUS.find(
      (status) => status.name === value
    );
    if (selectedStatus) {
      // If yes, set the 'inspect' flag to true; otherwise, set it to false
      setFormData((prevFormData) => ({
        ...prevFormData,
        inspect: selectedStatus.toinspect || false,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Store the previous status value
    const prevStatus = formData.status;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
      // Update the status only if 'inspect' is checked
      status: checked ? prevFormData.status || "" : prevStatus,
    }));

    // Check if the 'inspect' flag is true and update the status accordingly
    if (checked) {
      const correspondingStatus = RECEIPT_STATUS.find(
        (status) => status.toinspect
      );
      if (correspondingStatus) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          status: correspondingStatus.name,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        status: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include type.short in formData when the inspect checkbox is selected
      const formDataToSend = {
        ...formData,
        type_short: RECEIPT_TYPES.find(
          (type) => type.name === formData.receipt_name
        )?.short,
      };

      const response = await axios.post(
        `${API_URL}/create_receipt`,
        formDataToSend,
        {
          headers: generateHeaders(),
        }
      );
      setSuccessMessage("Receipt created successfully!");
      setErrorMessage("");
      console.log(response.data);
      setFormData({
        receiving_location_id: "",
        quantity: 0,
        uom_id: "",
        comments: "",
        item_id: "",
        receipt_name: "",
        inspect: false,
        transaction_number: 0,
        status: "",
        inspection_location_id: null,
      });
    } catch (error) {
      console.error("Error creating receipt:", error);
      setErrorMessage(`Error creating receipt: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Receipt</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            {/* Receipt Name field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="receipt_name">Receipt Name:</label>
                </div>
                <select
                  id="receipt_name"
                  name="receipt_name"
                  value={formData.receipt_name}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Receipt Type</option>
                  {RECEIPT_TYPES.map((type) => (
                    <option key={type.name} value={type.name}>
                      {type.name} ({type.short})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Transaction Number field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="transaction_number">
                    Transaction Number:
                  </label>
                </div>
                <input
                  type="text"
                  id="transaction_number"
                  name="transaction_number"
                  value={formData.transaction_number}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* Item field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="item_id">Item:</label>
                </div>
                <select
                  id="item_id"
                  name="item_id"
                  value={formData.item_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Item</option>
                  {items.map((item) => (
                    <option key={item.item_id} value={item.item_id}>
                      {item.item_code} ({item.item_name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quantity field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="quantity">Quantity:</label>
                </div>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* UOM field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="uom_id">Unit of Measure:</label>
                </div>
                <select
                  id="uom_id"
                  name="uom_id"
                  value={formData.uom_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select UOM</option>
                  {uoms.map((uom) => (
                    <option key={uom.uom_id} value={uom.uom_id}>
                      {uom.abbreviation} ({uom.uom_name})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Status field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="status">Status:</label>
                </div>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Status</option>
                  {RECEIPT_STATUS.map((index) => (
                    <option key={index.name} value={index.name}>
                      {index.sequence} {index.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Receiving Location field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="receiving_location_id">
                    Receiving Location:
                  </label>
                </div>
                <select
                  id="receiving_location_id"
                  name="receiving_location_id"
                  value={formData.receiving_location_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option
                      key={location.location_id}
                      value={location.location_id}
                    >
                      {location.location_name} ({location.warehouse_name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comments field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="comments">Batch & SNo range:</label>
                </div>
                <input
                  type="text"
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* Inspect field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="inspect">Inspect:</label>
                </div>
                <input
                  type="checkbox"
                  id="inspect"
                  name="inspect"
                  checked={formData.inspect}
                  onChange={handleCheckboxChange}
                  className="form-check-input"
                />
              </div>
            </div>
            {formData.inspect && (
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="inspection_location_id">
                      Inspection Location:
                    </label>
                  </div>
                  <select
                    id="inspection_location_id"
                    name="inspection_location_id"
                    value={formData.inspection_location_id}
                    onChange={handleChange}
                    className="form-control input-field"
                  >
                    <option value="">Select Inspection Location</option>
                    {locations.map((location) => (
                      <option
                        key={location.location_id}
                        value={location.location_id}
                      >
                        {location.location_name} ({location.warehouse_name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Submit button */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Receipt
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>You do not have permission to view this module</div>
        )}
        {/* Display success message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}
