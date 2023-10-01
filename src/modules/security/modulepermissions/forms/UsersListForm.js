import React, { useEffect, useState } from "react";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";

function UserListForm() {
  const [users, setUsers] = useState([]);

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
      return; // Do not fetch data if access is not granted
    }

    fetchData();
    // eslint-disable-next-line
  }, [hasRequiredAccess]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_users`, {
        headers: generateHeaders(), // Include headers here
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Users</h1>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>Username</th>
              <th>Employee ID</th>
              <th>Email ID</th>            
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="table-row">
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.empid}</td>
                <td>{user.emailid}</td>              
                <td>{user.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
}

export default UserListForm;
