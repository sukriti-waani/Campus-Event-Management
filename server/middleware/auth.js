const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  // Get token from header
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Expects "Bearer TOKEN"

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user payload (id, role) to request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

// Middleware to authorize user based on role
function authorizeRole(roles = []) {
  if (typeof roles === "string") {
    roles = [roles]; // Ensure roles is an array
  }

  return (req, res, next) => {
    // If no roles specified, allow access (but token must be present)
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied: Insufficient role" });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRole,
};
