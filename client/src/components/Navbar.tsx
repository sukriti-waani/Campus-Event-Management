// frontend/src/components/Navbar.tsx
import { Button } from "@/components/ui/button";
import { Calendar, LogIn, LogOut, Menu, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isStudent, isOrganizer, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect after logout
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CampusEvents
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Events
            </Link>

            {isOrganizer && (
              <>
                <Link
                  to="/organizer/dashboard"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/organizer/create"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Create Event
                </Link>
              </>
            )}

            <Link
              to="/about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>

            {isStudent && (
              <Link
                to="/my-registrations"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                My Registrations
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                  asChild
                >
                  <Link to="/signup">
                    <User className="mr-2 h-4 w-4" />
                    Signup
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <span className="text-sm font-medium">
                  Welcome, {user?.username} ({user?.role})
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>

              {isOrganizer && (
                <>
                  <Link
                    to="/organizer/dashboard"
                    className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/organizer/create"
                    className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                </>
              )}

              {isStudent && (
                <Link
                  to="/my-registrations"
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Registrations
                </Link>
              )}

              <Link
                to="/about"
                className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <div className="flex flex-col gap-2 px-4 pt-2 border-t">
                {!isAuthenticated ? (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-primary hover:opacity-90"
                      asChild
                    >
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Signup
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
