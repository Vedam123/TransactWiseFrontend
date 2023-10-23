import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

const AssignUserModulesForm = () => {
  const [formData, setFormData] = useState({
    username: "",
  });

  const [userModules, setUserModules] = useState([]);
  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [dbuserid, setDbuserid] = useState("");

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_ADMIN_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  // Function to generate headers with Authorization token and UserId
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

    fetchModuleList();
    // eslint-disable-next-line
  }, [hasRequiredAccess]);

  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] The DB user id stored in the global variable is ${dbuserid}`);
  }, [dbuserid]);

  const fetchModuleList = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_modules`, {
        headers: generateHeaders(), // Include headers here
      });
      setModuleList(response.data.modules);
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching module list: ${error}`);
    }
  };

  const handleUsernameChange = (event) => {
    setFormData({ ...formData, username: event.target.value });
  };

  const handleCheckUser = async () => {
    const trimmedUsername = formData.username.trim();

    try {
      const usersResponse = await axios.get(`${API_URL}/list_users`, {
        headers: generateHeaders(), // Include headers here
      });
      const usersData = usersResponse.data.users;
      if (!Array.isArray(usersData)) {
        logger.error(`[${new Date().toLocaleTimeString()}] Invalid response from the server. Users data is not in the expected format.`);
        return;
      }
      logger.info(`[${new Date().toLocaleTimeString()}] UsersData: ${JSON.stringify(usersData)}`);
      logger.info(`[${new Date().toLocaleTimeString()}] Entered user name: ${trimmedUsername}`);

      const user = usersData.find((user) => user.username === trimmedUsername);

      if (!user) {
        logger.info(`[${new Date().toLocaleTimeString()}] User Not found in the DB!`);
        setUserModules([]);
      } else {
        // Fetch the user's modules from the API
        setDbuserid(user.id);
        const userPermissionsResponse = await axios.get(
          `${API_URL}/list_user_permissions`,
          {
            headers: generateHeaders(), // Include headers here
          }
        );
        const userPermissionsData =
          userPermissionsResponse.data.user_module_permissions;
        const userModulesList = userPermissionsData
          .filter((permission) => permission.user_id === user.id)
          .map((permission) => permission.module);
        setUserModules(userModulesList);
        logger.info(`[${new Date().toLocaleTimeString()}] User Module List: ${userModulesList.join(", ")}`);
      }
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching users: ${error}`);
    }
  };

  const handleCancel = () => {
    setFormData({ username: "" });
    setSelectedModule("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedModule) {
      logger.error(`[${new Date().toLocaleTimeString()}] Please select a module.`);
      return;
    }

    logger.info(`[${new Date().toLocaleTimeString()}] Selected Module: ${selectedModule}`);
    logger.info(`[${new Date().toLocaleTimeString()}] Selected user id: ${dbuserid}`);

    try {
      const response = await axios.post(
        `${API_URL}/create_permissions`,
        [
          {
            user_id: dbuserid,
            module: selectedModule,
          },
        ],
        {
          headers: generateHeaders(), // Include headers here
        }
      );

      logger.info(`[${new Date().toLocaleTimeString()}] Response data: ${JSON.stringify(response.data)}`);
      // Clear form field after successful submission
      setFormData({ username: "" });
      setSelectedModule("");
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error creating/updating permission: ${error}`);
    }
  };

  return (
    <div className="child-container form-container">
      <h2 className="title">User Module Assignment</h2>
      {hasRequiredAccess ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="username">Username:</label>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
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
            {userModules.length > 0 && (
              <div>
                <div className="form-row">
                  <p>
                    User already assigned to <u>{userModules.join(", ")}</u>{" "}
                    module(s)
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectModule">Select Module:</label>
              </div>
              <select
                id="selectModule"
                name="selectModule"
                value={selectedModule}
                onChange={(event) => setSelectedModule(event.target.value)}
                className="form-control input-field"
              >
                <option value="">Select Module</option>
                {moduleList.map((module) => (
                  <option key={module.id} value={module.folder_name}>
                    {module.folder_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
};

export default AssignUserModulesForm;
