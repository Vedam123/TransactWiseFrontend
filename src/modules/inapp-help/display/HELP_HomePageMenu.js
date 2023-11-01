import "../../utilities/css/appcss.css";
import React from "react";

const HELP_HomePageMenu = () => (
<div >
    <h2 className="subheading">HomePageMenu Component</h2>
    <p className="indented-paragraph">
      The `Home Page` component is responsible for rendering a list of modules in the system 
    </p>
    <h3 className="subheading">Admin & Setups</h3>
    <p className="indented-paragraph">
      Employees, User ids, permissions can be created using this module
    </p>
    <h3 className="subheading">Common</h3>
    <p className="indented-paragraph">
      Using this module one can create various common items across all the modules like tax codes, exchange rages, business partner , currencies, bill of materials etc..
    </p>
    <h3 className="subheading">Products</h3>
    <p className="indented-paragraph">
      Using this module one can create Products and product categories
    </p>
    <h3 className="subheading">Inventory</h3>
    <p className="indented-paragraph">
      This can be used to receive / distribute materials and perform cycle counts in the inventory.
    </p>
    <h3 className="subheading">Purchase</h3>
    <p className="indented-paragraph">
      One can create Purchase requistion to Purchase orders in this Module
    </p>
    
    <h3 className="subheading">Sales</h3>
    <p className="indented-paragraph">
      Sales Order creation is possible with this module
    </p>
    <h3 className="subheading">Finance</h3>
    <p className="indented-paragraph">
      Using this Module one can create Sales Invoice, Purchase Invoice kind of transactions
    </p>   
     
  </div>
);

export default HELP_HomePageMenu;
