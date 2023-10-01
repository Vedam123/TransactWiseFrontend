import React, { useState, useEffect } from "react";
import { API_URL , BACKEND_COMMON_MODULE_NAME , MODULE_LEVEL_CREATE_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

export default function CreatePartnerForm() {
  const [formData, setFormData] = useState({
    partnertype: "",
    partnername: "",
    contactperson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
    taxid: "",
    registrationnumber: "",
    additionalinfo: "",
    currencycode: "",
    status: "",
    partnerimage: null,
  });

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const statusOptions = ["Active", "Inactive", "Dormant"];

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_CREATE_ACCESS // Replace with your access level constant
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_currencies`, {
          headers: generateHeaders(),
        });
        const currencies = response.data.currencies;
        const currencyCodes = currencies.map(
          (currency) => currency.currencycode
        );
        setCurrencyOptions(currencyCodes);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, [hasRequiredAccess]);

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userid,
      // Add other headers if needed
    };
  };

  const handleChange = (e) => {
    if (e.target.name === "partnerimage") {
      setFormData({ ...formData, partnerimage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("partnertype", formData.partnertype);
      formDataToSend.append("partnername", formData.partnername);
      formDataToSend.append("contactperson", formData.contactperson);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("postalcode", formData.postalcode);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("taxid", formData.taxid);
      formDataToSend.append("registrationnumber", formData.registrationnumber);
      formDataToSend.append("additionalinfo", formData.additionalinfo);
      formDataToSend.append("currencycode", formData.currencycode);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("partnerimage", formData.partnerimage);

      const response = await axios.post(
        `${API_URL}/create_partner_data`,
        formDataToSend,
        {
          headers: generateHeaders(),
        }
      );

      console.log(response.data);
      setFormData({
        partnertype: "",
        partnername: "",
        contactperson: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalcode: "",
        country: "",
        taxid: "",
        registrationnumber: "",
        additionalinfo: "",
        currencycode: "",
        status: "",
        partnerimage: null,
      });
    } catch (error) {
      console.error("Error creating partner data:", error);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Partner</h2>
      <div className="child-container form-container">
      {hasRequiredAccess ? ( <form onSubmit={handleSubmit}>
          {/* Partner Type */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="partnertype">Partner Type:</label>
              </div>
              <select
                id="partnertype"
                name="partnertype"
                value={formData.partnertype}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Partner Type</option>
                <option value="Supplier">Supplier</option>
                <option value="Customer">Customer</option>
                <option value="Both">Both</option>
                <option value="Internal">Internal</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>
          {/* Partner Name */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="partnername">Partner Name:</label>
              </div>
              <input
                type="text"
                id="partnername"
                name="partnername"
                value={formData.partnername}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Currency Code (LOV) */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="currencycode">Currency Code:</label>
              </div>
              <select
                id="currencycode"
                name="currencycode"
                value={formData.currencycode}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Currency Code</option>
                {currencyOptions.map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Status */}
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
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Address */}
          <div className="address-fieldset">
              <legend>Address</legend>
              <div className="address-fields">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="address">Address:</label>
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>

                {/* City */}
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="city">City:</label>
                  </div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>

                {/* State */}
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="state">State:</label>
                  </div>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>

                {/* Postal Code */}
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="postalcode">Postal Code:</label>
                  </div>
                  <input
                    type="text"
                    id="postalcode"
                    name="postalcode"
                    value={formData.postalcode}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>

                {/* Country */}
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="country">Country:</label>
                  </div>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>
              </div>
          </div>

          <div className="contact-fieldset">
 
              <legend>Contact Information</legend>
              {/* Contact Person */}
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="contactperson">Contact Person:</label>
                  </div>
                  <input
                    type="text"
                    id="contactperson"
                    name="contactperson"
                    value={formData.contactperson}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="phone">Phone:</label>
                  </div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="email">Email:</label>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>
              </div>

          </div>

          {/* Add more input fields for other partner attributes */}
          {/* Example: Partner Name, Contact Person, Email, Phone, etc. */}
          {/* Tax ID */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="taxid">Tax ID:</label>
              </div>
              <input
                type="text"
                id="taxid"
                name="taxid"
                value={formData.taxid}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Registration Number */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="registrationnumber">Registration Number:</label>
              </div>
              <input
                type="text"
                id="registrationnumber"
                name="registrationnumber"
                value={formData.registrationnumber}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Additional Information */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="additionalinfo">Additional Information:</label>
              </div>
              <textarea
                id="additionalinfo"
                name="additionalinfo"
                value={formData.additionalinfo}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Partner Image */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="partnerimage">Partner Image:</label>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  id="partnerimage"
                  name="partnerimage"
                  onChange={handleChange}
                  className="custom-file-input"
                />
                {formData.partnerimage && (
                  <img
                    src={URL.createObjectURL(formData.partnerimage)}
                    alt="Selected Partner "
                    className="selected-image"
                  />
                )}
              </div>
            </div>
          </div>
          {/* Submit button */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Create Partner
              </button>
            </div>
          </div>
        </form>  ) : (
          <div> You do not have permission to view this module </div>
        )}
      </div>
    </div>
  );
}
