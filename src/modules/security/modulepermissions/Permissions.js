export const hasPermission = (userPermissions, module, permissionType) => {
  const permission = userPermissions.find(
    (perm) => perm.module === module && perm[permissionType]
  );
  console.log("hasPermission:", permissionType, "Permission:", permission);
  return !!permission;
};  