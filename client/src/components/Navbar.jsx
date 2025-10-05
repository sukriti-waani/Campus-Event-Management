import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";
import { Button } from "./ui";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={`${styles.container} container`}>
        <NavLink to="/" className={styles.logo} onClick={closeMobileMenu}>
          CampusEvents
        </NavLink>

        <div className={styles.desktopMenu}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
                aria-current={(match) => (match ? "page" : undefined)}
              >
                Events
              </NavLink>
            </li>
            {isAuthenticated && user?.role === "student" && (
              <li className={styles.navItem}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                  aria-current={(match) => (match ? "page" : undefined)}
                >
                  My Dashboard
                </NavLink>
              </li>
            )}
            {isAuthenticated && user?.role === "organizer" && (
              <li className={styles.navItem}>
                <NavLink
                  to="/organizer-dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                  aria-current={(match) => (match ? "page" : undefined)}
                >
                  Organizer Dashboard
                </NavLink>
              </li>
            )}
            {isAuthenticated && user?.role === "student" && (
              <li className={styles.navItem}>
                <NavLink
                  to="/feedback"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                  aria-current={(match) => (match ? "page" : undefined)}
                >
                  Feedback
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className={styles.navActions}>
          {isAuthenticated ? (
            <>
              <span
                className={styles.welcomeText}
                aria-label={`Logged in as ${user.email}`}
              >
                Hello, {user.email.split("@")[0]}
              </span>
              <Button onClick={logout} variant="secondary" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMobileMenu}>
                <Button
                  variant="outline"
                  size="sm"
                  className={styles.authButton}
                >
                  Login
                </Button>
              </NavLink>
              <NavLink to="/register" onClick={closeMobileMenu}>
                <Button
                  variant="primary"
                  size="sm"
                  className={styles.authButton}
                >
                  Register
                </Button>
              </NavLink>
            </>
          )}

          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <ul className={styles.mobileNavList}>
          <li className={styles.mobileNavItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileNavLink} ${styles.active}`
                  : styles.mobileNavLink
              }
              onClick={closeMobileMenu}
              aria-current={(match) => (match ? "page" : undefined)}
            >
              Events
            </NavLink>
          </li>
          {isAuthenticated && user?.role === "student" && (
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.mobileNavLink} ${styles.active}`
                    : styles.mobileNavLink
                }
                onClick={closeMobileMenu}
                aria-current={(match) => (match ? "page" : undefined)}
              >
                My Dashboard
              </NavLink>
            </li>
          )}
          {isAuthenticated && user?.role === "organizer" && (
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/organizer-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.mobileNavLink} ${styles.active}`
                    : styles.mobileNavLink
                }
                onClick={closeMobileMenu}
                aria-current={(match) => (match ? "page" : undefined)}
              >
                Organizer Dashboard
              </NavLink>
            </li>
          )}
          {isAuthenticated && user?.role === "student" && (
            <li className={styles.mobileNavItem}>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.mobileNavLink} ${styles.active}`
                    : styles.mobileNavLink
                }
                onClick={closeMobileMenu}
                aria-current={(match) => (match ? "page" : undefined)}
              >
                Feedback
              </NavLink>
            </li>
          )}
          {isAuthenticated ? (
            <li className={styles.mobileNavItem}>
              <Button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                variant="secondary"
                className={styles.mobileAuthButton}
              >
                Logout
              </Button>
            </li>
          ) : (
            <>
              <li className={styles.mobileNavItem}>
                <NavLink to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className={styles.mobileAuthButton}>
                    Login
                  </Button>
                </NavLink>
              </li>
              <li className={styles.mobileNavItem}>
                <NavLink to="/register" onClick={closeMobileMenu}>
                  <Button variant="primary" className={styles.mobileAuthButton}>
                    Register
                  </Button>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
