import { Suspense, lazy } from "react";
import { FaSpinner } from "react-icons/fa"; // You'll need to install react-icons
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext"; // Import useAuth to check loading state

// Lazy-loaded components
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const EventList = lazy(() => import("./components/EventList"));
const EventDetails = lazy(() => import("./components/EventDetails"));
const OrganizerDashboard = lazy(() =>
  import("./components/OrganizerDashboard")
);
const Feedback = lazy(() => import("./components/Feedback"));
const NotFound = () => (
  <div className="container" style={{ padding: "2rem" }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

function App() {
  const { loading: authLoading } = useAuth(); // Use auth loading state

  if (authLoading) {
    // Show a global loading spinner while authentication state is being checked
    return (
      <div
        className={styles.fullScreenLoader}
        role="status"
        aria-label="Loading application"
      >
        <FaSpinner className={styles.spinnerIcon} />
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.mainContent}>
        <Suspense
          fallback={
            <div className={styles.suspenseLoader}>
              <FaSpinner className={styles.spinnerIcon} />
              <p>Loading content...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<EventList />} /> {/* Home page */}
            <Route path="/events/:id" element={<EventDetails />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["student", "organizer"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer-dashboard"
              element={
                <ProtectedRoute allowedRoles={["organizer"]}>
                  <OrganizerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <Feedback />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
