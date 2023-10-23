import React from "react";
import { APPLICATION_NAME } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function UserName({ username, emp_img }) {
  // Constants and variables
  const welcomeMessage = `${APPLICATION_NAME} Welcomes, ${username}`;

  // Log the component rendering with a constant
  logger.info(`[${new Date().toLocaleTimeString()}] UserName component rendered. Welcome message: ${welcomeMessage}`);

  return (
    <div className="user-header">
      {welcomeMessage}
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
