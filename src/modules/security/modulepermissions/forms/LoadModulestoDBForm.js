import React, { useEffect, useState } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";

const LoadModulestoDBForm = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch modules and insert them into the database  
      const modulesResponse = await axios.get(`${API_URL}/fetch_folder`);
      if (modulesResponse.data.message === "The modules are inserted in DB successfully") {       
        setMessage("All the backend application Modules are inserted into the table");
      } else {
        setMessage("Error fetching and inserting modules.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
