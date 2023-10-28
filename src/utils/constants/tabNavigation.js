export const tabIDs = {
  myProfile: "myProfile",
  allUser: "allUser",
  report: "report",
  logout: "logout",
};

export const tabNavigations = [
  {
    id: tabIDs.myProfile,
    name: "My Profile",
    rules: {},
  },
  {
    id: tabIDs.allUser,
    name: "All User",
    rules: { isAdmin: true },
  },
  {
    id: tabIDs.report,
    name: "Report",
    rules: { isAdmin: true },
  },
  {
    id: tabIDs.logout,
    name: "Logout",
    rules: {},
  },
];
