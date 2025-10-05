import { FaBell, FaCalendarCheck, FaChartLine, FaClock, FaUserFriends, FaUsers } from "react-icons/fa";
import styles from "./Features.module.css";

const features = [
  {
    icon: <FaCalendarCheck />,
    title: "Easy Registration",
    description: "Register for events with just a few clicks. Simple, fast, and hassle-free process."
  },
  {
    icon: <FaBell />,
    title: "Real-time Updates",
    description: "Get instant notifications about event changes, reminders, and new opportunities."
  },
  {
    icon: <FaUserFriends />,
    title: "Community Connect",
    description: "Meet like-minded students and expand your network through engaging campus activities."
  },
  {
    icon: <FaClock />,
    title: "Save Time",
    description: "No more searching through emails. All your events organized in one convenient place."
  },
  {
    icon: <FaChartLine />,
    title: "Track Participation",
    description: "Monitor your event history and see your involvement in campus life grow."
  },
  {
    icon: <FaUsers />,
    title: "For Organizers",
    description: "Powerful tools to create, manage events, and track student registrations effortlessly."
  }
];

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={`${styles.featuresContainer} container`}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <h2 className={styles.sectionTitle}>Why Join CampusEvents?</h2>
          <p className={styles.sectionDescription}>
            Everything you need to stay connected with campus life and never miss an exciting opportunity
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
