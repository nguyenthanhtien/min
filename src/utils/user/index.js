export const getRoleNames = ({ roles, roleIDs }) => {
  if (!roles?.length || !roleIDs?.length) return "";

  const foundRoles = roles.filter((role) => roleIDs.indexOf(role.id) !== -1);
  const roleNames = foundRoles
    .map((role) => role.name)
    .sort()
    .reverse()
    .join(", ");

  return roleNames;
};
