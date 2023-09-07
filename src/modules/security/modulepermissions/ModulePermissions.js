import { usePermissions } from "./PermissionsContext";
import { hasPermission } from "./Permissions"
import { SUPER_USERS_COUNT } from "../../admin/setups/ConstDecl";


  // modules/employee/permissions.js
  export const ModulePermission = {
    VIEW_EMPLOYEES: "read_permission",
    CREATE_EMPLOYEES: "write_permission",
    DELETE_EMPLOYEES: "delete_permission",
    UPDATE_EMPLOYEES: "update_permission",
  };

export default function ModulePermissions({ moduleName }) {

  const userPermissions = usePermissions(); // Fetch user permissions from context

  const userid = localStorage.getItem("loggedInUserid");  
  
  //if (parseInt(userPermissions && userPermissions.length > 0 && userPermissions[0].loggedInUserid) < SUPER_USERS_COUNT) {
    // If loggedInUserid is less than 100, set all permissions to true
   if (parseInt(userid) < SUPER_USERS_COUNT) {
    return {
      canViewModule: true,
      canCreateModule: true,
      canDeleteModule: true,
      canUpdateModule: true,
    };
  }


  const canViewModule = hasPermission(
    userPermissions,
    moduleName,
    ModulePermission.VIEW_EMPLOYEES
  );
  const canCreateModule = hasPermission(
    userPermissions,
    moduleName,
    ModulePermission.CREATE_EMPLOYEES
  );
  const canDeleteModule = hasPermission(
    userPermissions,
    moduleName,
    ModulePermission.DELETE_EMPLOYEES
  );
  const canUpdateModule = hasPermission(
    userPermissions,
    moduleName,
    ModulePermission.UPDATE_EMPLOYEES
  );

  return {
    canViewModule,
    canCreateModule,
    canDeleteModule,
    canUpdateModule
  };
}
