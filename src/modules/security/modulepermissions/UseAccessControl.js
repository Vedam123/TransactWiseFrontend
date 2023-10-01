import { useEffect, useState } from "react";
import CheckModuleAccess from "./CheckModuleAccess";

function useAccessContrdsfsadfsdfsadfsxol(moduleName, moduleLevelAccess) {
  const [hasRequiredAccess, setHasRequiredAccess] = useState(false);

  useEffect(() => {
    const access = CheckModuleAccess(moduleName, moduleLevelAccess);
    setHasRequiredAccess(access);
  }, [moduleName, moduleLevelAccess]);

  return hasRequiredAccess;
}

export default useAccessControl;
