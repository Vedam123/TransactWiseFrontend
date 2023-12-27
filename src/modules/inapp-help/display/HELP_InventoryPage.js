import React from "react";
import "../../utilities/css/appcss.css";

const HELP_InventoryPage = () => (
  <div>
    <h2 className="subheading">Bins Menu Component</h2>
    <p className="indented-paragraph">
      The `Bins Menu` component is responsible for rendering a list of menu items based on user permissions.
    </p>
    <h3 className="subheading">Create Bin</h3>
    <p className="indented-paragraph">
      Allows users to create a new bin.
    </p>
    <h3 className="subheading">Delete Bin</h3>
    <p className="indented-paragraph">
      Allows users to delete an existing bin.
    </p>
    <h3 className="subheading">Update Bin</h3>
    <p className="indented-paragraph">
      Allows users to update the details of an existing bin.
    </p>
    <h3 className="subheading">Get Bins</h3>
    <p className="indented-paragraph">
      Allows users to retrieve a list of bins based on specified conditions.
    </p>
  </div>
);

export default HELP_InventoryPage;
