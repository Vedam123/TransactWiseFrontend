import React from "react";
import "../../../utilities/css/appcss.css";
import RotatingImage from "../../../utilities/RotatingImage";
import BottomContainer from "../../../utilities/BottomContainer";
import DocumentationContainer from "../../../utilities/DocumentationContainer";
import RegisterUserForm from "./forms/RegisterUserForm";

function RegisterUser() {
  return (
    <div className="page-container">
      <h1 className="title">Create User</h1>

      <div className="parent-container">
        <RegisterUserForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}

export default RegisterUser;
