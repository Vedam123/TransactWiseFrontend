import React, { useEffect, useState } from "react";
import { API_URL } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";

function UserListForm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Users</h1>
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
    </div>
  );
}

export default UserListForm;
