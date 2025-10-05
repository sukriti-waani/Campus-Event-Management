import { FaArrowRight, FaCalendarAlt, FaRocket, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import { Button } from "./ui";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContainer} container`}>
        <div className={`${styles.heroContent} fade-in-up`}>
          <h1 className={styles.heroTitle}>
            Discover & Join Amazing
            <span className={styles.gradient}> Campus Events</span>
          </h1>
          <p className={styles.heroDescription}>
            Connect with your campus community through exciting events, workshops, and activities.
            Register easily, stay updated, and never miss out on the action!
          </p>
          <div className={styles.heroActions}>
            <Link to="/register">
              <Button variant="primary" size="lg" className={styles.ctaButton}>
                Get Started <FaArrowRight />
              </Button>
            </Link>
            <Link to="/#events">
              <Button variant="outline" size="lg">
                Browse Events
              </Button>
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={`${styles.statItem} fade-in-up delay-100`}>
              <div className={styles.statIcon}>
                <FaCalendarAlt />
              </div>
              <div className={styles.statContent}>
                <h3>500+</h3>
                <p>Events Hosted</p>
              </div>
            </div>
            <div className={`${styles.statItem} fade-in-up delay-200`}>
              <div className={styles.statIcon}>
                <FaUsers />
              </div>
              <div className={styles.statContent}>
                <h3>10K+</h3>
                <p>Active Students</p>
              </div>
            </div>
            <div className={`${styles.statItem} fade-in-up delay-300`}>
              <div className={styles.statIcon}>
                <FaRocket />
              </div>
              <div className={styles.statContent}>
                <h3>50+</h3>
                <p>Organizations</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.heroImage} fade-in-up delay-200`}>
          <div className={styles.imageWrapper}>
            <img
              src="https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Students at campus event"
              className={styles.mainImage}
            />
            <div className={styles.floatingCard1}>
              <FaCalendarAlt className={styles.cardIcon} />
              <span>Upcoming Events</span>
            </div>
            <div className={styles.floatingCard2}>
              <FaUsers className={styles.cardIcon} />
              <span>Join Community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
