// contexts/PermissionsContext.js
import { createContext, useContext } from "react";

const PermissionsContext = createContext();

export function usePermissions() {
  console.log("Permission Convext-->",PermissionsContext);
  return useContext(PermissionsContext);
}

export default PermissionsContext;