import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} container`}>
        <div className={styles.footerTop}>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerLogo}>CampusEvents</h3>
            <p className={styles.footerDescription}>
              Your one-stop platform for discovering and joining amazing campus events.
              Stay connected, get involved, and make memories!
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#events">Events</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>For Organizers</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/organizer-dashboard">Create Event</Link></li>
              <li><Link to="/organizer-dashboard">Manage Events</Link></li>
              <li><Link to="/organizer-dashboard">View Registrations</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <ul className={styles.footerContacts}>
              <li>Email: info@campusevents.edu</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: Campus Center, Room 101</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} CampusEvents. All rights reserved.
          </p>
          <div className={styles.footerBottomLinks}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
