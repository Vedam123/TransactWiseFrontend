import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { API_URL } from "../admin/setups/ConstDecl";
import { SUPER_USERS_COUNT, APPLICATION_NAME } from "../admin/setups/ConstDecl";

import RotatingImage from "../utilities/RotatingImage";
import Login from "./accessmgmt/authtoolkit/Login";
import UserName from "./accessmgmt/authtoolkit/UserName";
//import Profile from "./accessmgmt/authtoolkit/Profile";
import Logout from "./accessmgmt/authtoolkit/Logout";
import useToken from "./accessmgmt/authtoolkit/useToken";
import HomePage from "../application/HomePage";
import ViewAllEmployeesPage from "../employee/ViewAllEmployeesPage";
import AdminPage from "../admin/AdminPage";
import ViewEmailsPage from "../utilities/ViewEmailsPage";
import EmployeePage from "../employee/EmployeePage";
import CreateEmployeePage from "../employee/CreateEmployeePage";
import UserRolesPage from "./UserRolesPage";
import RegisterUser from "./accessmgmt/authtoolkit/RegisterUser";
import UsersList from "./modulepermissions/UsersList";
import ListUserPermissions from "./modulepermissions/ListUserPermissions";
import GrantPermissions from "./modulepermissions/GrantPermissions";
import AssignUserModules from "./modulepermissions/AssignUserModules";
import LoadModulestoDB from "./modulepermissions/LoadModulestoDB";
import PurchasePage from "../purchase/PurchasePage";
import ViewBOMExplodePage from "../common/bom/ViewBOMExplodePage";
import ProductsPage from "../products/ProductsPage";
import ViewAllProductsPage from "../products/product/ViewAllProductsPage";
import CommonPage from "../common/CommonPage";
import ViewAllUOMsPage from "../common/uoms/ViewAllUOMsPage";
import ViewAllCurrenciesPage from "../common/currencies/ViewAllCurrenciesPage";
import ViewAllExchangeRatesPage from "../common/exchangerates/ViewAllExchangeRatesPage";
import ViewAllTaxCodesPage from "../common/taxcodes/ViewAllTaxCodesPage";
import ViewAllProdCatPage from "../products/productcategories/ViewAllProdCatPage";
import PermissionsContext from "./modulepermissions/PermissionsContext";

import CurrenciesPage from "../common/currencies/CurrenciesPage";
import TaxCodesPage from "../common/taxcodes/TaxCodesPage";
import ExchangeRatesPage from "../common/exchangerates/ExchangeRatesPage";
import UOMPage from "../common/uoms/UOMPage";
import BOMPage from "../common/bom/BOMPage";
import CreateProdCatPage from "../products/productcategories/CreateProdCatPage";
import PartnerResults from "../common/businesspartner/forms/PartnerResults";
import PartnerSearchPage from "../common/businesspartner/PartnerSearchPage";
import CreatePartnerPage from "../common/businesspartner/CreatePartnerPage";
import CreateUISetupsPage from "../admin/CreateUISetupsPage";
import UISetupsSearchPage from "../admin/UISetupsSearchPage";
import ShowAllUISetupsForm from "../admin/forms/ShowAllUISetupsForm";
import CreateDBSetupsPage from "../admin/CreateDBSetupsPage";
import DBSetupsSearchPage from "../admin/DBSetupsSearchPage";
//import ShowAllDBSetupsForm from "../admin/forms/ShowAllDBSetupsForm";

function AuthenticationPage() {
  const { token, removeToken, setToken } = useToken();
  const [loggedInUserid, setLoggedInUserid] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [name, setName] = useState("");
  const [emp_img, setImage] = useState("");
  // eslint-disable-next-line
  const [refresh_token, setRefreshToken] = useState("");

  const nameWithSpace = name + "\u00a0";
  const useridWithSpace = loggedInUserid + "\u00a0";

  const handleLoginSuccess = (
    userid,
    username,
    token,
    refresh_token,
    name,
    emp_img
  ) => {
    setToken(token);
    setLoggedInUserid(userid);
    setName(name);
    setImage(emp_img);
    setRefreshToken(refresh_token);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("loggedInUserid");
    //console.log("Stored user id ",storedUserId);
    //console.log("Super user count ",SUPER_USERS_COUNT);
    //console.log("Loggedin user id vs stored user id ",loggedInUserid, storedUserId);
    const fetchUserPermissions = async () => {
      if (token) {
        try {
          let filteredPermissions;
          if (parseInt(storedUserId) < parseInt(SUPER_USERS_COUNT)) {
            const modulesResponse = await axios.get(`${API_URL}/list_modules`);
            const allModules = modulesResponse.data.modules;
            filteredPermissions = allModules.flatMap((module) => ({
              delete_permission: true,
              id: Math.random(),
              module: module.folder_name,
              read_permission: true,
              update_permission: true,
              user_id: storedUserId,
              write_permission: true,
              loggedInUserid: storedUserId,
            }));
            //console.log("UseEffect Super User fetch userPermissions ", filteredPermissions);
          } else {
            const response = await axios.get(
              `${API_URL}/list_user_permissions`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            //console.log("UseEffect FETCHED ", response.data.user_module_permissions,"Logged in Userid ",loggedInUserid);
            filteredPermissions = response.data.user_module_permissions
              .filter(
                (permission) =>
                  parseInt(permission.user_id) === parseInt(storedUserId)
              )
              .map((permission) => ({
                ...permission,
                loggedInUserid: storedUserId,
              }));
          }
          //console.log("UseEffect DB Filtered userPermissions ", filteredPermissions);
          setUserPermissions(filteredPermissions);
        } catch (error) {
          console.error("Error fetching user permissions:", error);
        }
      }
    };

    const storedEmpname = localStorage.getItem("name");
    if (storedEmpname) {
      setName(storedEmpname);
    }

    const storedEmppic = localStorage.getItem("emp_img");
    if (storedEmppic) {
      setImage(storedEmppic);
    }

    const storedRefreshToken = localStorage.getItem("refresh_token");
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }

    fetchUserPermissions();

    console.log();
    /* Do not delete the commented code below */
  }, [token, loggedInUserid, name, emp_img, refresh_token]);

  //eslint-disable-next-line
  //}, [loggedInUserid]);
  return (
    <BrowserRouter>
      {!token ? (
        <div className="page-container center-container">
          <h1 className="title">{APPLICATION_NAME}</h1>
          <Login onLoginSuccess={handleLoginSuccess} />
          <div className="rotating-image-container">
            <RotatingImage />
          </div>
        </div>
      ) : (
        <PermissionsContext.Provider value={userPermissions}>
          <header className="logout_page-container">
            <div className="left-header">
              <UserName
                username={nameWithSpace}
                userid={useridWithSpace}
                emp_img={emp_img}
              />
              <Link to="/">Home</Link>
            </div>
            <div className="right-header">
              <Logout token={removeToken} />
            </div>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employee-functions" element={<EmployeePage />} />
            <Route path="/list-employees" element={<ViewAllEmployeesPage />} />

            <Route path="/create-employee" element={<CreateEmployeePage />} />
            <Route path="/user-functions" element={<UserRolesPage />} />
            <Route path="/list-users" element={<UsersList />} />
            <Route
              path="/list-user-permissions"
              element={<ListUserPermissions />}
            />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/create-permissions" element={<GrantPermissions />} />
            <Route
              path="/assign-user-modules"
              element={<AssignUserModules />}
            />
            <Route path="/common-module" element={<CommonPage />} />

            <Route path="/currencies-page" element={<CurrenciesPage />} />
            <Route path="/taxcodes-page" element={<TaxCodesPage />} />
            <Route path="/exchangerates-page" element={<ExchangeRatesPage />} />
            <Route path="/uom-page" element={<UOMPage />} />
            <Route path="/bom-page" element={<BOMPage />} />

            <Route path="/bom-explosion" element={<ViewBOMExplodePage />} />
            <Route path="/list-uoms" element={<ViewAllUOMsPage />} />
            <Route
              path="/list-currencies"
              element={<ViewAllCurrenciesPage />}
            />
            <Route path="/list-tax-codes" element={<ViewAllTaxCodesPage />} />
            <Route
              path="/list-exchange-rates"
              element={<ViewAllExchangeRatesPage />}
            />
            <Route
              path="/list-product-categories"
              element={<ViewAllProdCatPage />}
            />
            <Route path="/admin-module" element={<AdminPage />} />

            <Route path="/load-all-modules" element={<LoadModulestoDB />} />
            <Route path="/view-emails-function" element={<ViewEmailsPage />} />

            <Route path="/create-ui-setups" element={<CreateUISetupsPage />} />

            <Route path="/create-db-setups" element={<CreateDBSetupsPage />} />

            <Route
              path="/list_ui_config_data/:searchType/:searchInput"
              element={<ShowAllUISetupsForm />}
            />
            <Route
              path="/list_ui_config_data"
              element={<ShowAllUISetupsForm />}
            />

            <Route path="/list-ui-setups" element={<UISetupsSearchPage />} />

            <Route path="/list-db-setups" element={<DBSetupsSearchPage />} />

            <Route path="/list-products" element={<ViewAllProductsPage />} />

            <Route
              path="/create-item-category"
              element={<CreateProdCatPage />}
            />
            <Route path="/products-module" element={<ProductsPage />} />
            <Route path="/purchase-module" element={<PurchasePage />} />

            <Route
              path="/partner-results/:searchType/:searchInput"
              element={<PartnerResults />}
            />
            <Route path="/partner-results" element={<PartnerResults />} />
            <Route
              path="/list-businesspartners"
              element={<PartnerSearchPage />}
            />

            <Route
              path="/create-businesspartner"
              element={<CreatePartnerPage />}
            />
          </Routes>
        </PermissionsContext.Provider>
      )}
    </BrowserRouter>
  );
}

export default AuthenticationPage;