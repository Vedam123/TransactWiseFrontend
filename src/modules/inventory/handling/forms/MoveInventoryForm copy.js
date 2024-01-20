import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";

export default function MoveInventoryForm() {
  const [formData, setFormData] = useState({
    source_inventory_id: "",
    source_transaction_id: "",
    source_item_id: "",
    source_transaction_type: "",
    source_uom_id: "",
    source_quantity: "",
    uom_name: "",
    source_bin_id: "", // Added field
    source_rack_id: "", // Added field
    source_row_id: "", // Added field
    source_aisle_id: "", // Added field
    source_zone_id: "", // Added field
    source_location_id: "", // Added field
    source_warehouse_id: "", // Added field
  });

  const setDefaultsWhenTypeChanges = {
    source_transaction_id: "",
    source_inventory_id: "",
    source_uom_id: "",
    source_quantity: "",
    uom_name: "",
    source_bin_id: "",
    source_rack_id: "",
    source_row_id: "",
    source_aisle_id: "",
    source_zone_id: "",
    source_location_id: "",
    source_warehouse_id: "",
    source_additional_info:"",
  };

  const setDefaultsWhenItemChanges = {
    ...setDefaultsWhenTypeChanges,
    source_transaction_type: "",
  };

  const [items, setItems] = useState([]);
  const [transactionIds, setTransactionIds] = useState([]);
  const [filteredTransactionTypes, setFilteredTransactionTypes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [binList, setBinList] = useState([]); // Add this line
  const [rackList, setRackList] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [aisleList, setAisleList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [selectedRack, setSelectedRack] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  //const [source_quantity, setQuantity] = useState("");

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const fetchData = async () => {
    try {
      // Fetch items
      const itemsResponse = await axios.get(`${API_URL}/get_item_inventory`, {
        headers: generateHeaders(),
      });
      setItems(itemsResponse.data.item_inventory_list);
    } catch (error) {
      logger.error(`Error fetching data:`, error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchBins(); // Fetch bins when the component mounts
    fetchRacks(); // Fetch racks when the component mounts
    fetchRows(); // Fetch racks when the component mounts
    fetchAisles(); // Fetch racks when the component mounts
    fetchZones(); // Fetch racks when the component mounts
    fetchLocations(); // Fetch racks when the component mounts
    fetchWarehouses(); // Fetch racks when the component mounts
  }, []);

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Update form data based on the field type
    const intValue = [
      "source_item_id",
      "source_inventory_id",
      "source_transaction_id",
      "source_uom_id",
      "source_bin_id", // Added field
      "source_rack_id", // Added field
      "source_row_id", // Added field
      "source_aisle_id", // Added field
      "source_zone_id", // Added field
      "source_location_id", // Added field
      "source_warehouse_id", // Added field
      "source_additional_info",
    ];

    const updatedValue = intValue.includes(name) ? parseInt(value, 10) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));

    if (name === "source_item_id") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...setDefaultsWhenItemChanges,
      }));

      const selectedItemId = parseInt(value, 10);

      const filteredItems = items.filter(
        (item) => item.item_id === selectedItemId
      );

      const filteredTransactionTypes = Array.from(
        new Set(
          filteredItems.flatMap((item) =>
            item.transaction_type ? [item.transaction_type] : []
          )
        )
      );

      // Update transactionIds in the state
      setFilteredTransactionTypes(filteredTransactionTypes);
    }

    if (name === "source_transaction_type") {
      const selectedTransactionType = value;

      setFormData((prevFormData) => ({
        ...prevFormData,
        ...setDefaultsWhenTypeChanges,
      }));

      // Filter items based on the selected item_id and transaction type
      const filteredItems = items.filter(
        (item) =>
          item.item_id === parseInt(formData.source_item_id, 10) &&
          item.transaction_type === selectedTransactionType
      );

      const sourceInventoryId = parseInt(formData.source_inventory_id, 10);

      // Find the item with the matching source_inventory_id
      const matchingItem = filteredItems.find(
        (item) => item.inventory_id === sourceInventoryId
      );

      if (matchingItem) {
        // Update source_quantity and source_uom_id in the state
        setFormData((prevFormData) => ({
          ...prevFormData,
          source_quantity: matchingItem.quantity,
          source_uom_id: matchingItem.uom_id,
          uom_name: matchingItem.uom_name,
        }));
      } else {
        // Handle the case when no matching item is found
        setFormData((prevFormData) => ({
          ...prevFormData,
          source_quantity: "",
          source_uom_id: "",
          uom_name: "",
        }));
      }

      // Create a Set of unique combinations of (transaction_id, inventory_id)
      const uniqueTransactionInventorySet = new Set(
        filteredItems.map(
          (item) => `${item.transaction_id}_${item.inventory_id}`
        )
      );

      // Convert the Set back to an array of objects
      const uniqueTransactionInventoryArray = Array.from(
        uniqueTransactionInventorySet
      ).map((uniqueKey) => {
        const [transaction_id, inventory_id] = uniqueKey.split("_");
        return {
          transaction_id: parseInt(transaction_id, 10),
          inventory_id: parseInt(inventory_id, 10),
        };
      });

      // Update transactionIds in the state
      setTransactionIds(uniqueTransactionInventoryArray);

      // Update form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        source_transaction_type: selectedTransactionType,
        source_transaction_id: "", // Reset transaction ID when changing transaction type
      }));
    }

    if (name === "source_inventory_id") {
      const selectedInventoryId = parseInt(value, 10);

      // Fetch source_quantity and source_uom_id based on the selected source_inventory_id
      const matchingItem = items.find(
        (item) => item.inventory_id === selectedInventoryId
      );

      if (matchingItem) {
        // Update source_quantity and source_uom_id in the state
        setFormData((prevFormData) => ({
          ...prevFormData,
          source_quantity: matchingItem.quantity,
          source_uom_id: matchingItem.uom_id,
          uom_name: matchingItem.uom_name,
          source_bin_id: matchingItem.bin_id,
          bin_name: matchingItem.bin_name,
          source_rack_id: matchingItem.rack_id,
          rack_name: matchingItem.rack_name,
          source_row_id: matchingItem.row_id,
          row_name: matchingItem.row_name,
          source_aisle_id: matchingItem.aisle_id,
          aisle_name: matchingItem.aisle_name,
          source_zone_id: matchingItem.zone_id,
          zone_name: matchingItem.zone_name,          
          source_location_id: matchingItem.location_id,
          location_name: matchingItem.location_name,           
          source_warehouse_id: matchingItem.warehouse_id,
          warehouse_name: matchingItem.warehouse_name, 
          source_additional_info: matchingItem.additional_info,
        }));
      } else {
        // Handle the case when no matching item is found
        setFormData((prevFormData) => ({
          ...prevFormData,
          source_quantity: "",
          source_uom_id: "",
          uom_name: "",
          source_bin_id: "",
          source_rack_id: "",
          source_row_id: "",
          source_aisle_id: "",
          source_zone_id: "",
          source_location_id: "",
          source_warehouse_id: "",
          source_additional_info: "",
        }));
      }

      console.log("Found matching item",matchingItem)
    }
    // ... (other handling logic)
  };

  const handleButtonClick = async () => {
    try {
      // Explicitly convert id fields to numbers
      const formDataWithIntIds = {
        ...formData,
        source_item_id: parseInt(formData.source_item_id, 10),
        source_inventory_id: parseInt(formData.source_inventory_id, 10),
        source_transaction_id: parseInt(formData.source_transaction_id, 10),
        source_uom_id: parseInt(formData.source_uom_id, 10),
      };

      console.log(formDataWithIntIds);

      const response = await axios.post(
        `${API_URL}/pack_or_unpack`,
        formDataWithIntIds,
        {
          headers: generateHeaders(),
        }
      );

      console.log(response.data);
      setSuccessMessage(response.data);
      setErrorMessage("");

      // Reset the form after a successful API call
      resetForm();

      fetchData();
    } catch (error) {
      console.error("Error calling pack_or_unpack API:", error);

      // Extract and set the specific error message from the API response
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(`Error calling pack_or_unpack API: ${error.message}`);
      }

      setSuccessMessage("");
    }
  };

  const resetForm = () => {
    // Reset form data
    setFormData({
      source_inventory_id: "",
      source_transaction_id: "",
      source_item_id: "",
      source_transaction_type: "",
      source_uom_id: "",
    });

    // Reset other state variables if needed
    setTransactionIds([]);
    setFilteredTransactionTypes([]);
    // ... any other state variables you want to reset
  };

  const fetchBins = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_bins`, { headers });
      setBinList(response.data.bin_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching bins:`,
        error
      );
      alert("Error fetching bins");
    }
  };

  const fetchRacks = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_racks`, { headers });
      setRackList(response.data.rack_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching racks:`,
        error
      );
      alert("Error fetching racks");
    }
  };

  const fetchRows = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_invrows`, { headers });
      setRowList(response.data.invrows_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching rows:`,
        error
      );
      alert("Error fetching rows");
    }
  };

  const fetchAisles = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_aisles`, { headers });
      setAisleList(response.data.aisle_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching aisles:`,
        error
      );
      alert("Error fetching aisles");
    }
  };

  const fetchZones = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_zones`, { headers });
      setZoneList(response.data.zone_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching zones:`,
        error
      );
      alert("Error fetching zones");
    }
  };

  const fetchLocations = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_locations`, { headers });
      setLocationList(response.data.location_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching locations:`,
        error
      );
      alert("Error fetching locations");
    }
  };

  const fetchWarehouses = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("loggedInUserid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_warehouses`, {
        headers,
      });
      setWarehouseList(response.data.warehouse_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching warehouses:`,
        error
      );
      alert("Error fetching warehouses");
    }
  };

  const handleBinChange = (event) => {
    setSelectedBin(event.target.value);
  };
  const handleRackChange = (event) => {
    setSelectedRack(event.target.value);
  };

  const handleRowChange = (event) => {
    setSelectedRow(event.target.value);
  };
  const handleAisleChange = (event) => {
    setSelectedAisle(event.target.value);
  };
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };
  // eslint-disable-next-line
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  const handleWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value);
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Move Item Inventory</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form>
            {/* Item field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_item_id">Item:</label>
                </div>
                <select
                  id="source_item_id"
                  name="source_item_id"
                  value={formData.source_item_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Item</option>
                  {Array.from(new Set(items.map((item) => item.item_id))).map(
                    (item_id) => {
                      const selectedItem = items.find(
                        (item) => item.item_id === item_id
                      );
                      return (
                        <option
                          key={selectedItem.item_id}
                          value={selectedItem.item_id}
                        >
                          {selectedItem.item_code} - {selectedItem.item_name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>

            {/* Transaction Type field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_transaction_type">
                    Transaction Type:
                  </label>
                </div>
                <select
                  id="source_transaction_type"
                  name="source_transaction_type"
                  value={formData.source_transaction_type}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option key="" value="">
                    Select Transaction Type
                  </option>
                  {filteredTransactionTypes &&
                  filteredTransactionTypes.length > 0 ? (
                    filteredTransactionTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))
                  ) : (
                    <option value="">No transaction types available</option>
                  )}
                </select>
              </div>
            </div>

            {/* Transaction ID field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_inventory_id">Inventory ID:</label>
                </div>
                <select
                  id="source_inventory_id"
                  name="source_inventory_id"
                  value={formData.source_inventory_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Inventory ID</option>
                  {transactionIds && transactionIds.length > 0 ? (
                    transactionIds.map((type, index) => (
                      <option
                        key={index}
                        value={type.inventory_id}
                        data-transaction-id={type.transaction_id}
                      >
                        {type.inventory_id && type.transaction_id
                          ? `${type.inventory_id} - ${type.transaction_id}`
                          : "Invalid Option"}
                      </option>
                    ))
                  ) : (
                    <option value="">No Inventory is available</option>
                  )}
                </select>
              </div>
            </div>
            {/* Quantity display field */}

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="selectedLocation">Inventory Qty:</label>
                </div>
                <input
                  type="text"
                  id="source_quantity"
                  name="source_quantity"
                  value={formData.source_quantity}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div>
            {/* Source UOM field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_uom_id">Source UOM:</label>
                </div>
                <input
                  type="text"
                  id="source_uom_id"
                  value={formData.uom_name}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div>

            {/* Source Bin field */}

            {formData.source_bin_id && (
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_bin_id">Source Bin:</label>
                </div>
                <input
                  type="text"
                  id="source_bin_id"
                  value={formData.bin_name}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div> ) }

            {/* Source Rack field */}
            {formData.source_rack_id && (<div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_rack_id">Source Rack:</label>
                </div>
                <input
                  type="text"
                  id="source_rack_id"
                  value={formData.rack_name}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div>)}
            
            {formData.source_row_id && (
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_row_id">Source Row:</label>
                </div>
                <input
                  type="text"
                  id="source_row_id"
                  value={formData.row_name}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div>)}

            {formData.source_aisle_id && (
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_aisle_id">Source Aisle:</label>
                </div>
                <input
                  type="text"
                  id="source_aisle_id"
                  value={formData.aisle_name}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div>)}

            {formData.source_zone_id && (
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_zone_id">Source zone:</label>
                </div>
                <input
                  type="text"
                  id="source_zone_id"
                  value={formData.zone_name}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div>)}

            {formData.source_location_id && (
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_location_id">Source Location:</label>
                </div>
                <input
                  type="text"
                  id="source_location_id"
                  value={formData.location_name}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div>)}

            {formData.source_warehouse_id && (
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="source_warehouse_id">Source warehouse:</label>
                </div>
                <input
                  type="text"
                  id="source_warehouse_id"
                  value={formData.warehouse_name}
                  className="form-control input-field"
                  readOnly
                />
              </div>
            </div>)}

            {/* Button to call the POST API */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleButtonClick}
                >
                  Move
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
