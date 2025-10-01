import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, Hop as Home, ChartBar as BarChart3, MessageSquare, LogIn, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/feedback", label: "Feedback", icon: MessageSquare },
    { path: "/login", label: "Login", icon: LogIn },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className={styles.logoText}>
              CampusEvents
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {navItems.map(({ path, label, icon: Icon }) => {
              if (path === '/login' && user) return null;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`${styles.navLink} ${
                    isActive(path)
                      ? styles.navLinkActive
                      : ""
                  }`}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              );
            })}

            <button
              onClick={toggleTheme}
              className={styles.navLink}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {user && (
              <button
                onClick={signOut}
                className={styles.navLink}
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.mobileMenuButton}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavLinks}>
              {navItems.map(({ path, label, icon: Icon }) => {
                if (path === '/login' && user) return null;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`${styles.mobileNavLink} ${
                      isActive(path)
                        ? styles.mobileNavLinkActive
                        : ""
                    }`}
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className={styles.mobileNavLink}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {user && (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className={styles.mobileNavLink}
                  aria-label="Logout"
                >                  <LogOut className="h-5 w-5" aria-hidden="true" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}