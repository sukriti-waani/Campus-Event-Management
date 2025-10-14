// frontend/src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute component restricts access based on authentication and roles.
 *
 * Props:
 * - allowedRoles: array of allowed roles, e.g., ["student"], ["organizer"]
 */
function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  // If user is not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not allowed, redirect to home or unauthorized page
  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render child routes/components
  return <Outlet />;
}

export default ProtectedRoute;
