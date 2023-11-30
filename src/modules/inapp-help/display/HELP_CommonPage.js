import React from "react";
import "../../utilities/css/appcss.css";

const HELP_CommonPage = () => (
  <div>
    <h2 className="subheading">Common Page Menu Component</h2>
    <p className="indented-paragraph">
      The `Common Page Menu` component is responsible for rendering a list of menu items based on user permissions.
    </p>
    <h3 className="subheading">Business Partners</h3>
    <p className="indented-paragraph">
      The Business Partners section allows users to manage and view information about various business partners.
    </p>
    <h3 className="subheading">Currencies</h3>
    <p className="indented-paragraph">
      The Currencies module is used for viewing and managing different currencies.
    </p>
    <h3 className="subheading">Exchange Rates</h3>
    <p className="indented-paragraph">
      The Exchange Rates section provides information about currency exchange rates.
    </p>
    <h3 className="subheading">Tax Codes</h3>
    <p className="indented-paragraph">
      Tax Codes allow users to configure tax-related information for transactions.
    </p>
    <h3 className="subheading">Units of Measurement (UOM)</h3>
    <p className="indented-paragraph">
      The UOM module is used to manage units of measurement for products and goods.
    </p>
    <h3 className="subheading">BOM</h3>
    <p className="indented-paragraph">
      Create BOM and explode Bill of Materials for Model items
    </p>
    <h3 className="subheading">Legal Entities</h3>
    <p className="indented-paragraph">
      Using this menu item one can create , update , delete , and view Leagal entities
    </p>
  </div>
);

export default HELP_CommonPage;
