import React from "react";
import "../../utilities/css/appcss.css";

const HELP_FinancePage = () => (
  <div>
    <h2 className="subheading">Finance Module</h2>
    <p className="indented-paragraph">
      In this module you can create all kinds of financial transactions for this application
    </p>
    <h4 className="subheading">Accounts </h4>
    <p className="indented-paragraph">
      The `Accounts Menu` component is responsible for rendering a list of menu items based on user permissions.
    </p>
    <h3 className="subheading">Create Account</h3>
    <p className="indented-paragraph">
      The Create Account option allows users to create a new account in the system.
    </p>
    <h3 className="subheading">Delete Account</h3>
    <p className="indented-paragraph">
      The Delete Account option enables users to delete an existing account from the system.
    </p>
    <h3 className="subheading">Update Account</h3>
    <p className="indented-paragraph">
      The Update Account option allows users to modify details of an existing account.
    </p>
    <h3 className="subheading">Get Accounts</h3>
    <p className="indented-paragraph">
      The Get Accounts option provides users with a list of existing accounts in the system.
    </p>
  </div>
);

export default HELP_FinancePage;
