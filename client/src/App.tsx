import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerLogin from "./pages/OrganizerLogin";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

// Initialize React Query client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/organizer/login" element={<OrganizerLogin />} />

              {/* Protected Routes for Organizer */}
              <Route element={<ProtectedRoute allowedRoles={["organizer"]} />}>
                <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
                <Route path="/organizer/create" element={<CreateEvent />} />
                <Route path="/organizer/edit/:id" element={<CreateEvent />} />
              </Route>

              {/* Protected Routes for Student */}
              <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
                <Route
                  path="/my-registrations"
                  element={<div>My Student Registrations Page (TODO)</div>}
                />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
