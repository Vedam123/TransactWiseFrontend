import React, { useEffect, useState } from "react";
import { API_URL } from "../../admin/setups/ConstDecl";
import axios from "axios";
import "../../utilities/css/appcss.css";

function EmployeeListForm() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/employee`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
          <div className="child-container form-container">
        <h1 className="title">List of Employees</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th className="table-header">Name</th>
              <th>Employee No.</th>
              <th>Manager</th>
              <th>Supervisor</th>
              <th>Salary</th>
              <th>Designation</th>
              <th>Date of Birth</th>
              <th>Date of Joining</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empid} className="table-row">
                <td>{employee.name}</td>
                <td>{employee.empid}</td>
                <td>{employee.manager}</td>
                <td>{employee.supervisor}</td>
                <td>{employee.salary}</td>
                <td>{employee.role}</td>
                <td>{employee.dob}</td>
                <td>{employee.doj}</td>
                <td>
                  {employee.pic && (
                    <img
                      src={`data:image/png;base64,${employee.pic}`}
                      alt="Employee Pic"
                      className="employee-pic"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
}

export default EmployeeListForm;
