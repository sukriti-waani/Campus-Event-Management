import { useEffect, useState } from "react";
import { FaCalendarCheck, FaRegCalendarAlt } from "react-icons/fa"; // react-icons
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Dashboard.module.css";
import { Button, Card, Skeleton } from "./ui";

const mockRegisteredEvents = [
  {
    id: "e001",
    title: "Annual Tech Conference",
    date: "2024-05-15",
    time: "09:00 AM",
    location: "Campus Auditorium",
    category: "Academic",
    imageUrl:
      "https://via.placeholder.com/300x200/007bff/ffffff?text=Tech+Conf",
  },
  {
    id: "e003",
    title: "Campus Charity Run",
    date: "2024-06-01",
    time: "08:00 AM",
    location: "Campus Grounds",
    category: "Sports",
    imageUrl:
      "https://via.placeholder.com/300x200/28a745/ffffff?text=Charity+Run",
  },
  {
    id: "e005",
    title: "Spring Art Exhibition",
    date: "2024-06-10",
    time: "02:00 PM",
    location: "University Gallery",
    category: "Arts & Culture",
    imageUrl:
      "https://via.placeholder.com/300x200/17a2b8/ffffff?text=Art+Exhibition",
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching registered events from an API
    const fetchRegisteredEvents = async () => {
      setLoading(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          setRegisteredEvents(mockRegisteredEvents);
          setLoading(false);
          resolve();
        }, 1000); // Simulate network delay
      });
    };

    if (user && user.role === "student") {
      fetchRegisteredEvents();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user || user.role !== "student") {
    // This case should be handled by ProtectedRoute, but good for defensive coding
    return (
      <div className="container">
        <p>Access Denied: You must be a student to view this dashboard.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.dashboard} container`}>
      <h1 className={styles.title}>
        <FaCalendarCheck className={styles.icon} aria-hidden="true" /> My
        Registered Events
      </h1>

      {loading ? (
        <div className={styles.eventGrid}>
          {[...Array(3)].map((_, index) => (
            <Card key={index} className={styles.eventCard}>
              <Skeleton height="150px" className={styles.skeletonImage} />
              <div className={styles.cardContent}>
                <Skeleton
                  height="24px"
                  width="70%"
                  style={{ marginBottom: "8px" }}
                />
                <Skeleton
                  height="18px"
                  width="90%"
                  style={{ marginBottom: "4px" }}
                />
                <Skeleton height="18px" width="80%" />
              </div>
            </Card>
          ))}
        </div>
      ) : registeredEvents.length > 0 ? (
        <div className={styles.eventGrid}>
          {registeredEvents.map((event) => (
            <Card key={event.id} className={styles.eventCard}>
              <img
                src={event.imageUrl}
                alt={event.title}
                className={styles.eventImage}
                loading="lazy"
              />
              <div className={styles.cardContent}>
                <h3 className={styles.eventName}>{event.title}</h3>
                <p className={styles.eventInfo}>
                  <FaRegCalendarAlt
                    aria-hidden="true"
                    className={styles.infoIcon}
                  />
                  <span>
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </span>
                </p>
                <p className={styles.eventInfo}>
                  <span className={styles.categoryTag}>{event.category}</span>
                </p>
                <Link to={`/events/${event.id}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    className={styles.detailsButton}
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          You haven't registered for any events yet.{" "}
          <Link to="/">Browse available events</Link>
        </p>
      )}
    </div>
  );
};

export default Dashboard;
