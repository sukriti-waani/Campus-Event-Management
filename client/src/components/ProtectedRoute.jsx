import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  if (loading) {
    // Optionally render a simple loading spinner or null while auth state is being determined
    return null; // Or <p>Loading user data...</p>;
  }

  if (!isAuthenticated) {
    showToast("You need to log in to access this page.", "warning");
    // Redirect unauthenticated users to the login page, storing current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    showToast("You don't have permission to access this page.", "danger");
    // Redirect unauthorized users to their dashboard or home
    return <Navigate to="/" replace />; // Or to a specific unauthorized page
  }

  return children;
};

export default ProtectedRoute;
