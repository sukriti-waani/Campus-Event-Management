import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, Home, BarChart3, MessageSquare, LogIn } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/feedback", label: "Feedback", icon: MessageSquare },
    { path: "/login", label: "Login", icon: LogIn },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              CampusEvents
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive(path)
                    ? "bg-primary-100 text-primary-700 shadow-md"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-300"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-up">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive(path)
                      ? "bg-primary-100 text-primary-700 shadow-md"
                      : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}