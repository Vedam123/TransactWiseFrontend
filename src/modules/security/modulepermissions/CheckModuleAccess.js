// accessControl.js

import ModulePermissions from "./ModulePermissions";

export default function CheckModuleAccess(moduleName, requiredAccess) {
  const userPermissions = ModulePermissions({ moduleName });
  const hasRequiredAccess = userPermissions[requiredAccess];
  return hasRequiredAccess;
}
