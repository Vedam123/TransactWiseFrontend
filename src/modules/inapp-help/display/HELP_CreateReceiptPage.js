import React from "react";
import "../../utilities/css/appcss.css";

const HELP_CreateReceiptPage = () => (
  <div>
    <h2 className="subheading">Create Receipt</h2>
    <p className="indented-paragraph">
      The `Create Receipt Form` allows users to input information for creating a new receipt in the system.
    </p>
    <h3 className="subheading">Receipt Name</h3>
    <p className="indented-paragraph">
      Select the type of receipt you want to create. Choose from the available receipt types in the dropdown.
    </p>
    <h3 className="subheading">Transaction Number</h3>
    <p className="indented-paragraph">
      Enter a transaction number associated with the receipt.
    </p>
    <h3 className="subheading">Item</h3>
    <p className="indented-paragraph">
      Choose the item for which the receipt is being created. Items are listed in the dropdown.
    </p>
    {/* Add similar sections for other form fields as needed */}
    <h3 className="subheading">Inspect</h3>
    <p className="indented-paragraph">
      Check the "Inspect" checkbox if the receipt requires inspection. This may affect the subsequent steps and status.
    </p>
    <h3 className="subheading">Submission</h3>
    <p className="indented-paragraph">
      After filling in the necessary information, click the "Create Receipt" button to submit the form and create the receipt.
    </p>
    <h3 className="subheading">Permission</h3>
    <p className="indented-paragraph">
      Users need the appropriate permissions to access and use the Create Receipt Form. Ensure proper module-level access is granted.
    </p>
  </div>
);

export default HELP_CreateReceiptPage;
