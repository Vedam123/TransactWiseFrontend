import React, { useEffect, useState } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";

const UserPermissionsForm = () => {
  const [userModulePermissions, setUserModulePermissions] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_user_permissions`);
      const sortedPermissions = response.data.user_module_permissions.sort(
        (a, b) => a.user_id - b.user_id
      );

      setUserModulePermissions(sortedPermissions);

      // Fetch user details and store them in the userDetails state
      const usersResponse = await axios.get(`${API_URL}/list_users`);
      const users = usersResponse.data.users.reduce(
        (acc, user) => ({ ...acc, [user.id]: user.username }),
        {}
      );
      setUserDetails(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="child-container form-container">
      <h1 className="title">List of User Module Permissions</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-header">
            <th>ID</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Module</th>
            <th>Read Permission</th>
            <th>Write Permission</th>
            <th>Update Permission</th>
            <th>Delete Permission</th>
          </tr>
        </thead>
        <tbody>
          {userModulePermissions.map((permission) => (
            <tr key={permission.id} className="table-row">
              <td>{permission.id}</td>
              <td>{permission.user_id}</td>
              <td>{userDetails[permission.user_id]}</td>
              <td>{permission.module}</td>
              <td>{permission.read_permission.toString()}</td>
              <td>{permission.write_permission.toString()}</td>
              <td>{permission.update_permission.toString()}</td>
              <td>{permission.delete_permission.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPermissionsForm;
