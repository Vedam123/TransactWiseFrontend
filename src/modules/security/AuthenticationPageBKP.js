import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { API_URL } from "../admin/setups/ConstDecl";
import { SUPER_USERS_COUNT } from "../admin/setups/ConstDecl";

import RotatingImage from "../../modules/utilities/RotatingImage";
import Login from "./accessmgmt/authtoolkit/Login";
import Header from "./accessmgmt/authtoolkit/Header";
import useToken from "./accessmgmt/authtoolkit/useToken";
import HomePage from "../../modules/application/HomePage";
import ViewAllEmployeesPage from "../../modules/employee/ViewAllEmployeesPage";
import AdminPage from "../../modules/admin/AdminPage";
import ViewEmailsPage from "../../modules/utilities/ViewEmailsPage";
import EmployeePage from "../employee/EmployeePage";
import CreateEmployeePage from "../../modules/employee/CreateEmployeePage";
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

function AuthenticationPage() {
  const { token, removeToken, setToken } = useToken();
  const [showRegister, setShowRegister] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [loggedInUserid, setLoggedInUserid] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);

  const handleLoginSuccess = (userid, username, token) => {
    setToken(token);
    setLoggedInUsername(username);
    setLoggedInUserid(userid);
    console.log("In the HandleLoginSuccess Function -->",username,userid)
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  useEffect(() => {
    const fetchUserPermissions = async () => {
      if (token) {
        try {
          let filteredPermissions;
          if (loggedInUserid < SUPER_USERS_COUNT) {
            const modulesResponse = await axios.get(`${API_URL}/list_modules`);
            const allModules = modulesResponse.data.modules;
            filteredPermissions = allModules.flatMap((module) => ({
              delete_permission: true,
              id: Math.random(),
              module: module.folder_name,
              read_permission: true,
              update_permission: true,
              user_id: loggedInUserid,
              write_permission: true,
              loggedInUsername,
              loggedInUserid,
            }));
          } else {
            const response = await axios.get(
              `${API_URL}/list_user_permissions`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            filteredPermissions = response.data.user_module_permissions
              .filter((permission) => permission.user_id === loggedInUserid)
              .map((permission) => ({
                ...permission,
                loggedInUsername,
                loggedInUserid,
              }));
          }
          setUserPermissions(filteredPermissions);
        } catch (error) {
          console.error("Error fetching user permissions:", error);
        }
      }
    };
    fetchUserPermissions();
  }, [token, loggedInUsername, loggedInUserid]);

  return (
    <BrowserRouter>
      {showRegister ? (
        <RegisterUser />
      ) : (
        <>
          {!token ? (
            <div className="page-container center-container ">
              <h1 className="title">User Authentication Page</h1>
              <div className="register-button-container">
                <button onClick={handleRegisterClick}>Register</button>
              </div>
              <Login onLoginSuccess={handleLoginSuccess} />
              <div className="rotating-image-container">
                <RotatingImage />
              </div>
            </div>
          ) : (
            <PermissionsContext.Provider value={userPermissions}>
              <>
                <Header token={removeToken} />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/employee-functions"
                    element={<EmployeePage />}
                  />
                  <Route
                    path="/list-employees"
                    element={<ViewAllEmployeesPage />}
                  />
                  <Route
                    path="/create-employee"
                    element={<CreateEmployeePage />}
                  />
                  <Route path="/user-functions" element={<UserRolesPage />} />
                  <Route path="/list-users" element={<UsersList />} />
                  <Route
                    path="/list-user-permissions"
                    element={<ListUserPermissions />}
                  />
                  <Route path="/register-user" element={<RegisterUser />} />
                  <Route
                    path="/create-permissions"
                    element={<GrantPermissions />}
                  />
                  <Route
                    path="/assign-user-modules"
                    element={<AssignUserModules />}
                  />
                  <Route path="/common-module" element={<CommonPage />} />

                  <Route path="/currencies-page" element={<CurrenciesPage />} />
                  <Route path="/taxcodes-page" element={<TaxCodesPage />} />
                  <Route
                    path="/exchangerates-page"
                    element={<ExchangeRatesPage />}
                  />
                  <Route path="/uom-page" element={<UOMPage />} />
                  <Route path="/bom-page" element={<BOMPage />} />

                  <Route
                    path="/bom-explosion"
                    element={<ViewBOMExplodePage />}
                  />
                  <Route path="/list-uoms" element={<ViewAllUOMsPage />} />
                  <Route
                    path="/list-currencies"
                    element={<ViewAllCurrenciesPage />}
                  />
                  <Route
                    path="/list-tax-codes"
                    element={<ViewAllTaxCodesPage />}
                  />
                  <Route
                    path="/list-exchange-rates"
                    element={<ViewAllExchangeRatesPage />}
                  />
                  <Route
                    path="/list-product-categories"
                    element={<ViewAllProdCatPage />}
                  />
                  <Route path="/admin-module" element={<AdminPage />} />

                  <Route
                    path="/load-all-modules"
                    element={<LoadModulestoDB />}
                  />
                  <Route
                    path="/view-emails-function"
                    element={<ViewEmailsPage />}
                  />
                  <Route
                    path="/list-products"
                    element={<ViewAllProductsPage />}
                  />

                  <Route
                    path="/create-item-category"
                    element={<CreateProdCatPage />}
                  />
                  <Route path="/products-module" element={<ProductsPage />} />
                  <Route path="/purchase-module" element={<PurchasePage />} />

                  <Route path="/partner-results/:searchType/:searchInput" element={<PartnerResults/>} />
                  <Route path="/partner-results" element={<PartnerResults/>} />
                  <Route path="/list-businesspartners" element={<PartnerSearchPage/>} />

                  <Route path="/create-businesspartner" element={<CreatePartnerPage/>} />

                  

                </Routes>
              </>
            </PermissionsContext.Provider>
          )}
        </>
      )}
    </BrowserRouter>
  );
}

export default AuthenticationPage;
