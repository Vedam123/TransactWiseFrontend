import { API_URL } from "../../../admin/setups/ConstDecl";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../utilities/css/appcss.css";

const AssignUserModuleForm = () => {
  const [formData, setFormData] = useState({
    username: "",
  });

  const [userModules, setUserModules] = useState([]);
  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [dbuserid, setDbuserid] = useState("");

  useEffect(() => {
    fetchModuleList();
  }, []);

  useEffect(() => {
    console.log("The DB user id stored in the global variable is ", dbuserid);
  }, [dbuserid]);

  const fetchModuleList = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_modules`);
      setModuleList(response.data.modules);
    } catch (error) {
      console.error("Error fetching module list:", error);
    }
  };

  const handleUsernameChange = (event) => {
    setFormData({ ...formData, username: event.target.value });
  };

  const handleCheckUser = async () => {
    const trimmedUsername = formData.username.trim();

    try {
      const usersResponse = await axios.get(`${API_URL}/list_users`);
      const usersData = usersResponse.data.users;
      if (!Array.isArray(usersData)) {
        console.log(
          "Invalid response from the server. Users data is not in the expected format."
        );
        return;
      }
      console.log("UsersData ", usersData);
      console.log("enterd user name ", trimmedUsername);

      const user = usersData.find((user) => user.username === trimmedUsername);
     // console.log(user);


      if (!user) {
        console.log("User Not found in the DB!");
        setUserModules([]);
      } else {
        // Fetch the user's modules from the API
        setDbuserid(user.id);
        const userPermissionsResponse = await axios.get(
          `${API_URL}/list_user_permissions`
        );
        const userPermissionsData =
          userPermissionsResponse.data.user_module_permissions;
        const userModulesList = userPermissionsData
          .filter((permission) => permission.user_id === user.id)
          .map((permission) => permission.module);
        setUserModules(userModulesList);
        console.log("User Module List ", userModules);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCancel = () => {
    setFormData({ username: "" });
    setSelectedModule("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedModule) {
      console.error("Please select a module.");
      return;
    }

    console.log("Selected Module", selectedModule);
    console.log("selected user id", dbuserid);

    try {
      const response = await axios.post(`${API_URL}/create_permissions`, [{
        user_id: dbuserid,
        module: selectedModule,
      }]);

      console.log(response.data);
      // Clear form field after successful submission
      setFormData({ username: "" });
      setSelectedModule("");
    } catch (error) {
      console.error("Error creating/updating permission:", error);
    }
  };

  return (
    <div className="child-container form-container">
      <h2 className="title">User Module assignment</h2>
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
                  user already assigned to <u> {userModules.join(", ")} </u> module(s)
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
        <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AssignUserModuleForm;
