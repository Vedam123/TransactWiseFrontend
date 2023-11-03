import "../../utilities/css/appcss.css";
import React from "react";

const HELP_CreatePartnerPage = () => (
  <div>
    <h2 className="subheading">Create Partner Form</h2>
    <p className="indented-paragraph">
      The `CreatePartnerForm` component allows you to create new partner records in the system.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      This form contains various fields for entering partner information:
    </p>
    <ul>
      <li>
        <strong>Partner Type:</strong> Select the type of partner (Supplier, Customer, Both, Internal, All).
        <span className="help-example">Example: Supplier</span>
      </li>
      <li>
        <strong>Partner Name:</strong> Enter the name of the partner.
        <span className="help-example">Example: ABC Corporation</span>
      </li>
      <li>
        <strong>Currency Code:</strong> Select the currency code from the list of options.
        <span className="help-example">Example: USD</span>
      </li>
      <li>
        <strong>Status:</strong> Select the status of the partner (Active, Inactive, Dormant).
        <span className="help-example">Example: Active</span>
      </li>
      <li>
        <strong>Address:</strong> Enter the partner's address.
        <span className="help-example">Example: 123 Main St</span>
      </li>
      <li>
        <strong>City:</strong> Enter the city where the partner is located.
        <span className="help-example">Example: New York</span>
      </li>
      <li>
        <strong>State:</strong> Enter the state or region where the partner is located.
        <span className="help-example">Example: NY</span>
      </li>
      <li>
        <strong>Postal Code:</strong> Enter the postal code of the partner's location.
        <span className="help-example">Example: 10001</span>
      </li>
      <li>
        <strong>Country:</strong> Enter the country where the partner is located.
        <span className="help-example">Example: USA</span>
      </li>
      <li>
        <strong>Contact Person:</strong> Enter the name of the contact person for the partner.
        <span className="help-example">Example: John Smith</span>
      </li>
      <li>
        <strong>Phone:</strong> Enter the phone number of the contact person.
        <span className="help-example">Example: (123) 456-7890</span>
      </li>
      <li>
        <strong>Email:</strong> Enter the email address of the contact person.
        <span className="help-example">Example: john.smith@example.com</span>
      </li>
      <li>
        <strong>Tax ID:</strong> Enter the tax identification number for the partner.
        <span className="help-example">Example: 123-45-6789</span>
      </li>
      <li>
        <strong>Registration Number:</strong> Enter the registration number for the partner.
        <span className="help-example">Example: ABC123456</span>
      </li>
      <li>
        <strong>Additional Information:</strong> Enter any additional information about the partner.
        <span className="help-example">Example: This partner is a key supplier for our company.</span>
      </li>
      <li>
        <strong>Partner Image:</strong> Upload an image of the partner (JPG, PNG, GIF).
        <span className="help-example">Example: partner.jpg</span>
      </li>
    </ul>

    <h3 className="subheading">Submit Button</h3>
    <p className="indented-paragraph">
      Click the "Create Partner" button to create a new partner record with the provided information.
    </p>

    <h3 className="subheading">Access Permissions</h3>
    <p className="indented-paragraph">
      Your access to this module is determined by your user role and permissions. If you do not have the necessary access, you will see a message indicating that you do not have permission to view this module.
      <span className="help-example">Example: You do not have permission to view this module</span>
    </p>
  </div>
);

export default HELP_CreatePartnerPage;