import React from "react";
import ListUserPermissionsForm from "./forms/ListUserPermissionsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function UsersPermissions() {
  return (
    <div className="page-container">
      <h1 className="title">Granted Permissions for users</h1>
      
      <ListUserPermissionsForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default UsersPermissions;