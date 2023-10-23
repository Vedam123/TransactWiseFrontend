import React, { useEffect, useState } from "react";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

const LoadModulestoDBForm = () => {
  const [message, setMessage] = useState("");

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_ADMIN_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  // Function to generate headers with Authorization token and UserId
  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
      // Add other headers if needed
    };
  };

  useEffect(() => {
    if (!hasRequiredAccess) {
      setMessage("You do not have permission to view this module");
      logger.warn(`[${new Date().toLocaleTimeString()}] User does not have required access to view this module.`);
      return;
    }
    
    fetchData();
    // eslint-disable-next-line
  }, [hasRequiredAccess]);

  const fetchData = async () => {
    try {
      const logTime = `[${new Date().toLocaleTimeString()}]`;
      logger.info(`${logTime} Fetching and inserting modules into the database...`);

      // Fetch modules and insert them into the database
      const modulesResponse = await axios.get(`${API_URL}/fetch_folder`, {
        headers: generateHeaders(), // Include headers here
      });

      if (modulesResponse.data.message === "The modules are inserted in DB successfully") {
        setMessage("All the backend application Modules are inserted into the table");
        logger.info(`${logTime} Modules fetched and inserted successfully.`);
      } else {
        setMessage("Error fetching and inserting modules.");
        logger.error(`${logTime} Error fetching and inserting modules.`);
      }
    } catch (error) {
      const logTime = `[${new Date().toLocaleTimeString()}]`;
      logger.error(`${logTime} Error fetching data:`, error);
      console.error(`${logTime} Error fetching data:`, error);
    }
  };

  return (
    <div className="child-container form-container">
      <h1 className="title"> Modules</h1>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoadModulestoDBForm;
