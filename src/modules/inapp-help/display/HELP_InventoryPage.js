import React from "react";
import "../../utilities/css/appcss.css";

const HELP_InventoryPage = () => (
  <div>
    <h2 className="subheading">Inventory Page</h2>
    <p className="indented-paragraph">
      The `Inventory Page` serves as a hub for various inventory-related
      functions.
    </p>
    <h3 className="subheading">Components</h3>
    <p className="indented-paragraph">
      This page renders the following components:
      <ul>
        <li>Handling Page</li>
        <li>Transactions Page</li>
        <li>Receipts Page</li>
      </ul>
    </p>
    <h2 className="subheading">Receipts Page</h2>
    <p className="indented-paragraph">
      The `Receipts Menu` provides options for interacting with receipts, such
      as creating, updating, and viewing.
    </p>
    <h2 className="subheading">Handling Menu</h2>
    <p className="indented-paragraph">
      The `Handling Menu` provides options for handling inventory items, such as
      UOM conversion and item consolidation.
    </p>
    <h2 className="subheading">Transactions Menu</h2>
    <p className="indented-paragraph">
      The `Transactions Menu` provides options for performing transactions on
      inventory items, such as put away and inspection.
    </p>
  </div>
);
export default HELP_InventoryPage;
