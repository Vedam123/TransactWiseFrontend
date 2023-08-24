import React from "react";
import UsersListForm from "./forms/UsersListForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function UsersList() {
  return (
    <div className="page-container">
      <h1 className="title">List of Users</h1>
      <UsersListForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default UsersList;
