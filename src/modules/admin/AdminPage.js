import React from "react";
import AdminPageMenu from "./menus/AdminPageMenu";
//import EmployeeMenuItem from "./menus/EmployeeMenuItem";
//import UsersMenuItem from "./menus/UsersMenuItem";
//import ViewEmailsMenuItem from "./menus/ViewEmailsMenuItem";

import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";


export default function AdminPage() {
  return (
    <div className="page-container">
      <h1 className="title">Admin & Setups</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Admin Functions" color="#FFD799">
            <AdminPageMenu />
          </DisplayCard>
        </div>
        <DocumentationContainer />
      </div>

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
