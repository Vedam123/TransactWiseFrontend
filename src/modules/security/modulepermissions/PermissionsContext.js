// contexts/PermissionsContext.js
import { createContext, useContext } from "react";

const PermissionsContext = createContext();

export function usePermissions() {
  return useContext(PermissionsContext);
}

export default PermissionsContext;