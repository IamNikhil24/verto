// allowedRoles: array of roles allowed for a route
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user's role is in allowedRoles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient permissions" });
    }

    next(); // User has the required role
  };
};

module.exports = roleMiddleware;
