import React from "react";
import { APPLICATION_NAME } from "../../../admin/setups/ConstDecl";

function UserName({ username, emp_img }) {
  return (
    <div className="user-header">
      {APPLICATION_NAME} Welcomes, {username}{" "}
      {emp_img !== "None" && emp_img !== null && (
        <img
          src={`data:image/png;base64,${emp_img}`}
          alt="Employee Pic"
          className="employee-pic"
        />
      )}
    </div>
  );
}

export default UserName;
