import "../../utilities/css/appcss.css";
import React from "react";

const HELP_HomePageMenu = () => (
  <div>
    <h2 className="subheading">Home Page Menu</h2>
    <p className="indented-paragraph">
      The `Home Page Menu` component is responsible for rendering a list of available modules within the system. It displays the menu options that users can access, depending on their permissions.
    </p>

    <h3 className="subheading">Admin & Setups</h3>
    <p className="indented-paragraph">
      The `Admin & Setups` module allows administrators to manage users, roles, and system-wide configurations. This includes creating employees, user IDs, and setting up permissions.
    </p>

    <h3 className="subheading">Common</h3>
    <p className="indented-paragraph">
      The `Common` module is used for managing items shared across all other modules, such as tax codes, exchange rates, business partners, currencies, and bill of materials.
    </p>

    <h3 className="subheading">Products</h3>
    <p className="indented-paragraph">
      The `Products` module allows users to create and manage products and product categories, facilitating inventory and sales management.
    </p>

    <h3 className="subheading">Inventory</h3>
    <p className="indented-paragraph">
      The `Inventory` module enables users to manage inventory processes, including receiving and distributing materials, as well as performing cycle counts.
    </p>

    <h3 className="subheading">Purchase</h3>
    <p className="indented-paragraph">
      The `Purchase` module allows users to create purchase requisitions and generate purchase orders, streamlining the procurement process.
    </p>

    <h3 className="subheading">Sales</h3>
    <p className="indented-paragraph">
      The `Sales` module enables users to create and manage sales orders, which are integral for processing customer orders and shipments.
    </p>

    <h3 className="subheading">Finance</h3>
    <p className="indented-paragraph">
      The `Finance` module is used to create financial transactions, including sales invoices, purchase invoices, and other accounting activities.
    </p>

    <h3 className="subheading">Permissions Management</h3>
    <p className="indented-paragraph">
      Each menu item in the `Home Page Menu` is linked to a specific module. Access to these modules is controlled by user permissions, ensuring that only authorized users can access and perform actions within each module.
    </p>
  </div>
);

export default HELP_HomePageMenu;
