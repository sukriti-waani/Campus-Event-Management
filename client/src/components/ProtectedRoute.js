import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    // Authenticated but not authorized, redirect to homepage or access denied page
    return <Navigate to="/" replace />; // Or /unauthorized
  }

  // Authenticated and authorized, render child routes/components
  return <Outlet />;
}

export default ProtectedRoute;
