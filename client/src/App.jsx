import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

const Dashboard = lazy(() => import("./components/Dashboard.jsx"));
const EventDetails = lazy(() => import("./components/EventDetails.jsx"));
const EventList = lazy(() => import("./components/EventList.jsx"));
const Feedback = lazy(() => import("./components/Feedback.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const OrganizerDashboard = lazy(() => import("./components/OrganizerDashboard.jsx"));
const Register = lazy(() => import("./components/Register.jsx"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
              <Navbar />
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<EventList />} />
                  <Route path="/event/:id" element={<EventDetails />} />
                  <Route path="/register/:eventName" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/organizer-dashboard"
                    element={
                      <ProtectedRoute requireOrganizer>
                        <OrganizerDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}