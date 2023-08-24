import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";

const GrantPermissionsForm = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [gbuserid, setGbuserid] = useState("");
  const [moduleEntries, setModuleEntries] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const displayStatusMessage = (message, duration = 3000) => {
    setStatusMessage(message);
    setTimeout(() => {
      setStatusMessage("");
    }, duration);
  };

  const handleCancel = () => {
    setUsername("");
    setUserData(null);
    setModuleEntries([]);
  };

  useEffect(() => {
    //fetchModules();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCheckUser = async () => {
    const trimmedUsername = username.trim();

    try {
      // Check if the user exists in adm.users table
      const usersResponse = await axios.get(`${API_URL}/list_users`);
      const usersData = usersResponse.data.users;
      if (!Array.isArray(usersData)) {
          console.log("Invalid response from the server. Users data is not in the expected format.")
        return;
      }

      const user = usersData.find((user) => user.username === trimmedUsername);

      if (!user) {
        //alert("Username not found in the users list.");
        displayStatusMessage("User Not found in the DB!");
        setUserData(null);
        setModuleEntries([]);
        return;
      }

      const dbuserid = user.id;
      setGbuserid(dbuserid);
      console.log("DB user id ", dbuserid);

      // Check if the user exists in adm.user_module_permissions table
      const permissionsResponse = await axios.get(
        `${API_URL}/list_user_permissions`
      );
      const userPermissionsData =
        permissionsResponse.data.user_module_permissions;

      if (!Array.isArray(userPermissionsData)) {
        alert(
          "Invalid response from the server. User permissions data is not in the expected format."
        );
        return;
      }
      console.log("Seems userPermissionsData is an Arry ");
      const userPermissions = userPermissionsData.find(
        (perm) => perm.user_id === dbuserid
      );
      console.log(userPermissions.id);

      const userPermissionsbyUserid = userPermissionsData.filter(
        (perm) => perm.user_id === dbuserid
      );
      console.log(userPermissionsbyUserid);
      if (userPermissionsbyUserid.length > 0) {
        // If the user exists in adm.user_module_permissions table, set the module entries for editing
        console.log("User is present in the permissions table as well");
        setUserData(user);

        const moduleEntriesForUser = userPermissionsbyUserid.map(
          (permission) => ({
            //folder_name: permission.module,
            module: permission.module,
            read_permission: permission.read_permission,
            write_permission: permission.write_permission,
            update_permission: permission.update_permission,
            delete_permission: permission.delete_permission,
          })
        );

        setModuleEntries(moduleEntriesForUser);
      } else {
        // If the user does not exist in adm.user_module_permissions table, reset module entries
        console.log("User is not present in the permissions table");
        setUserData(user);
        setModuleEntries([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleModuleEntryChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setModuleEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        [name]: newValue,
      };
      return updatedEntries;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedModuleEntries = moduleEntries.map((entry) => ({
      ...entry,
      user_id: gbuserid, // Add the dbuserid as the value of user_id for each entry
    }));

    console.log("Request data:", updatedModuleEntries);

    try {
      const response = await axios.post(
        `${API_URL}/create_permissions`,
        updatedModuleEntries
      );

      console.log(response.data);
      // Clear form fields after successful submission
      setUsername("");
      setUserData(null);
      setModuleEntries([]);
      // Display success message
      displayStatusMessage("Permissions saved successfully!");
    } catch (error) {
      console.error("Error creating/updating permission:", error);
      // Display error message
      displayStatusMessage(
        "Error saving permissions. Please try again later.",
        5000
      );
    }
  };

  return (
    <div className="child-container form-container">
      <h1 className="title">Create User Module Permissions</h1>
      <form onSubmit={handleSubmit}>
        {statusMessage && <div className="status-message">{statusMessage}</div>}
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="username">Username :</label>
            </div>
            <input
              type="text"
              id="usernameInput"
              name="usernameInput"
              value={username}
              onChange={handleUsernameChange}
              className="form-control input-field"
            />
            <button
              type="button"
              onClick={handleCheckUser}
              className="menu-button"
            >
              CheckUser
            </button>
          </div>
        </div>
        {userData && (
          <div>
            <h4 className="sub-title">Permissions for {userData.username}</h4>
            {moduleEntries.map((entry, index) => (
              <div key={index} className="form-row">
                <div className="label-container">
                  <label htmlFor={`module`}>Module:</label>
                </div>
                <input
                  type="text"
                  id={`module`}
                  name="module"
                  defaultValue={entry.module}
                  className="permission-row"
                />
                <label>
                  <input
                    type="checkbox"
                    name={`read_permission`}
                    defaultChecked={entry.read_permission}
                    onChange={(event) => handleModuleEntryChange(index, event)}
                  />
                  Read
                </label>
                <label>
                  <input
                    type="checkbox"
                    name={`write_permission`}
                    defaultChecked={entry.write_permission}
                    onChange={(event) => handleModuleEntryChange(index, event)}
                  />
                  Write
                </label>
                <label>
                  <input
                    type="checkbox"
                    name={`update_permission`}
                    defaultChecked={entry.update_permission}
                    onChange={(event) => handleModuleEntryChange(index, event)}
                  />
                  Update
                </label>
                <label>
                  <input
                    type="checkbox"
                    name={`delete_permission`}
                    defaultChecked={entry.delete_permission}
                    onChange={(event) => handleModuleEntryChange(index, event)}
                  />
                  Delete
                </label>
              </div>
            ))}
            
          </div>
        )}
        <div className="right-side-form-button">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Permissions
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrantPermissionsForm;
