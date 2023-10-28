export const standardHeaderNames = {
  no: {
    key: "no",
    name: "No.",
  },
  fullName: {
    key: "fullName",
    name: "Full Name",
  },
  email: {
    key: "email",
    name: "Email",
  },
};

export const allUserHeaderNames = {
  ...standardHeaderNames,
  roles: {
    key: "roles",
    name: "Role",
  },
  active: {
    key: "active",
    name: "Active/Not active",
  },
};

export const reportHeaderNames = {
  no: {
    ...standardHeaderNames.no,
    width: "55px",
  },
  playerName: {
    key: "playerName",
    name: "Player Name",
  },
  email: {
    key: "playerEmail",
    name: "Email",
  },
  sessions: {
    key: "sessions",
    name: "Session",
    width: "220px"
  },
  achievements: {
    key: "achievements",
    name: "Achievements",
    width: "143px",
  },
};
