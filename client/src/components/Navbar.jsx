import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, Home, BarChart3, MessageSquare, LogIn } from "lucide-react";
import styles from './Navbar.module.css';

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
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`${styles.navLink} ${
                  isActive(path)
                    ? styles.navLinkActive
                    : ""
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
            className={styles.mobileMenuButton}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavLinks}>
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`${styles.mobileNavLink} ${
                    isActive(path)
                      ? styles.mobileNavLinkActive
                      : ""
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