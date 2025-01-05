// Load environment variables from the .env file
//import dotenv from 'dotenv';
//dotenv.config(); // This will read from your .env file and populate process.env

// Data generated from the apiUrl http://localhost:8010/list_ui_config_data
//export const API_URL = "http://localhost:8012";
//export const FRONTEND_URL = "http://localhost:3000";
//export const SMTP_URL = "http://localhost:5000";
//export const SMTP_EML = "smtp_server@flexerp.com";
//export const APPLICATION_NAME = "TradeTrackr";
//export const APPLICATION_LEVEL = "Production"  //Test, Production, Development

//export const API_URL = process.env.APP_SERVER_HOST_URL;
//export const FRONTEND_URL = process.env.WEB_CLIENT_HOST_URL;
//export const SMTP_URL = process.env.SMTP_HOST_URL;
//export const SMTP_EML = process.env.SMTP_EMAIL_ID;
//export const APPLICATION_NAME = process.env.APPLICATION_NAME;
//export const APPLICATION_LEVEL = process.env.APPLICATION_LEVEL;;

//export const API_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_APP_SERVER_HOST}:${process.env.REACT_APP_APP_SERVER_PORT}`;
//export const FRONTEND_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_WEB_CLIENT_HOST}:${process.env.REACT_APP_WEB_CLIENT_PORT}`;
//export const SMTP_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SMTP_HOST}:${process.env.REACT_APP_SMTP_PORT}`;

export const API_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_APP_SERVER_HOST}:${parseInt(process.env.REACT_APP_APP_SERVER_PORT)}`;
export const FRONTEND_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_WEB_CLIENT_HOST}:${parseInt(process.env.REACT_APP_WEB_CLIENT_PORT)}`;
export const SMTP_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SMTP_HOST}:${parseInt(process.env.REACT_APP_SMTP_PORT)}`;
export const SMTP_EML = process.env.REACT_APP_SMTP_EMAIL;
export const APPLICATION_NAME = process.env.REACT_APP_APPLICATION_NAME;
export const APPLICATION_LEVEL = process.env.REACT_APP_APPLICATION_LEVEL;


export const SUPER_USERS_COUNT = 100;
export const TOKEN_EXPIRATION_CHECK_FREQUENCY = 600;  // For 10 min we need to set 600000 milli seconds
export const MODULE_LEVEL_VIEW_ACCESS = "canViewModule";
export const MODULE_LEVEL_CREATE_ACCESS = "canCreateModule";
export const MODULE_LEVEL_DELETE_ACCESS = "canDeleteModule";
export const MODULE_LEVEL_UPDATE_ACCESS = "canUpdateModule";
export const BACKEND_PRODUCT_MODULE_NAME = "products";
export const BACKEND_EMPLOYEE_MODULE_NAME = "employee";
export const BACKEND_SECURITY_MODULE_NAME = "security";
export const BACKEND_ADMIN_MODULE_NAME = "admin";
export const BACKEND_COMMON_MODULE_NAME = "common";
export const BACKEND_INVENTORY_MODULE_NAME = "inventory";
export const BACKEND_PURCHASE_MODULE_NAME = "purchase";
export const BACKEND_SALES_MODULE_NAME = "sales";
export const BACKEND_FINANCE_MODULE_NAME = "finance";
export const IS_INAPP_HELP_NEEDED = true;
export const IS_ACCESS_CONTROLLED_BY_REFRESH_TOKEN = false;
export const ACCOUNT_TYPES = [
  "Cash",
  "Accounts Receivable",
  "Inventory",
  "Property, Plant, and Equipment (PP&E)",
  "Accounts Payable",
  "Loans Payable",
  "Accrued Liabilities",
  "Owner's Equity",
  "Retained Earnings",
  "Sales",
  "Interest Income",
  "Cost of Goods Sold (COGS)",
  "Rent Expense",
  "Utilities Expense",
  "Salary/Wages Income",
  "Rent/Mortgage Expense",
  "Groceries Expense",
  "Purchase"
];
export const USER_STATUS = [
  { status: "Active", short_name: "ACTIVE", sequence: 10 },
  { status: "Expired", short_name: "EXPIRED", sequence: 20 },
];

export const ENV_INSTANCES = [
  { instance: "instance0", company: "Company_0", status: "Active", sequence: 10 },
  { instance: "instance1", company: "Company_0", status: "Active", sequence: 20 },
  { instance: "instance2", company: "Company_0", status: "Active", sequence: 30 },
  { instance: "instance3", company: "Company_0", status: "Active", sequence: 40 },
  { instance: "instance4", company: "Company_0", status: "Inactive", sequence: 50 }
];

