import "../../utilities/css/appcss.css";
import React from "react";

const HELP_UserRolesPage = () => (
  <div>
    <h2 className="subheading">User Roles Menu</h2>
    <p className="indented-paragraph">
      The `UserRolesMenu` component provides a menu for managing user roles and access.
    </p>

    <h3 className="subheading">Menu Items</h3>
    <p className="indented-paragraph">
      This menu contains various items for user role management:
    </p>
    <ul>
      <li>
        <strong>Create User:</strong> Create a new user. <span className="help-example">Example: John Doe</span>
      </li>
      <li>
        <strong>Delete User:</strong> Delete a user. <span className="help-example">Example: Jane Smith</span>
      </li>
      <li>
        <strong>Modify User:</strong> Modify user information. <span className="help-example">Example: Michael Johnson</span>
      </li>
      <li>
        <strong>List Users:</strong> View a list of users. <span className="help-example">Example: All Users</span>
      </li>
      {/* Add more menu items here */}
    </ul>

    <h3 className="subheading">Menu Actions</h3>
    <p className="indented-paragraph">
      Click on a menu item to perform the corresponding action.
    </p>
    <h2 className="subheading">Permissions Menu</h2>
    <p className="indented-paragraph">
      The `PermissionsMenu` component provides a menu for managing permissions and access control.
    </p>

    <h3 className="subheading">Menu Items</h3>
    <p className="indented-paragraph">
      This menu contains various items for managing permissions:
    </p>
    <ul>
      <li>
        <strong>Load Modules:</strong> Load available modules. <span className="help-example">Example: All Modules</span>
      </li>
      <li>
        <strong>Assign User Modules:</strong> Assign modules to users. <span className="help-example">Example: Assign Modules</span>
      </li>
      <li>
        <strong>Grant Accesses:</strong> Grant access permissions. <span className="help-example">Example: Grant All Access</span>
      </li>
      <li>
        <strong>List User Accesses:</strong> List user access permissions. <span className="help-example">Example: List Accesses</span>
      </li>
      {/* Add more menu items here */}
    </ul>

    <h3 className="subheading">Menu Actions</h3>
    <p className="indented-paragraph">
      Click on a menu item to perform the corresponding action.
    </p>
  </div>
);
export default HELP_UserRolesPage;
