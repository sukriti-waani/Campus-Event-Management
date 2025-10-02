import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaMapMarkerAlt,
  FaTag,
  FaTrashAlt,
  FaUser,
} from "react-icons/fa"; // react-icons
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import styles from "./EventDetails.module.css";
import { Button, Card, Skeleton } from "./ui";

// Re-using mockEvents from EventList for demonstration
const mockEvents = [
  {
    id: "e001",
    title: "Annual Tech Conference",
    date: "2024-05-15",
    time: "09:00 AM",
    location: "Campus Auditorium",
    category: "Academic",
    description:
      "A comprehensive tech conference covering AI, Machine Learning, and Web Development. This event features keynote speakers from industry leaders, interactive workshops, and a networking session. Don't miss this opportunity to connect with professionals and learn about the latest trends!",
    organizer: { id: "o1", name: "Computer Science Dept." },
    imageUrl:
      "https://via.placeholder.com/600x400/007bff/ffffff?text=Tech+Conf",
  },
  {
    id: "e002",
    title: "Freshers' Welcome Party",
    date: "2024-05-20",
    time: "07:00 PM",
    location: "Student Union Hall",
    category: "Social",
    description:
      "Get to know your fellow freshers at this exciting welcome party with music, food, and fun games. It's a great chance to make new friends and start your university journey with a bang!",
    organizer: { id: "o2", name: "Student Life Office" },
    imageUrl:
      "https://via.placeholder.com/600x400/6c757d/ffffff?text=Welcome+Party",
  },
  {
    id: "e003",
    title: "Campus Charity Run",
    date: "2024-06-01",
    time: "08:00 AM",
    location: "Campus Grounds",
    category: "Sports",
    description:
      "Join us for a charity run to support local schools. All fitness levels welcome! Participants will receive a free t-shirt and refreshments. Medals for top finishers!",
    organizer: { id: "o3", name: "Athletic Department" },
    imageUrl:
      "https://via.placeholder.com/600x400/28a745/ffffff?text=Charity+Run",
  },
  {
    id: "e004",
    title: "Guest Lecture: Future of AI",
    date: "2024-06-05",
    time: "03:00 PM",
    location: "Lecture Hall 1",
    category: "Academic",
    description:
      "An insightful lecture by a leading expert on the advancements and future of Artificial Intelligence. This lecture is open to all students and faculty interested in cutting-edge technology and its ethical implications.",
    organizer: { id: "o1", name: "Computer Science Dept." },
    imageUrl:
      "https://via.placeholder.com/600x400/dc3545/ffffff?text=AI+Lecture",
  },
  {
    id: "e005",
    title: "Spring Art Exhibition",
    date: "2024-06-10",
    time: "02:00 PM",
    location: "University Gallery",
    category: "Arts & Culture",
    description:
      "Explore diverse artworks from talented student artists. Refreshments will be served during the opening reception. Meet the artists and discuss their inspirations!",
    organizer: { id: "o4", name: "Fine Arts Society" },
    imageUrl:
      "https://via.placeholder.com/600x400/17a2b8/ffffff?text=Art+Exhibition",
  },
  {
    id: "e006",
    title: "Inter-Department Debate Competition",
    date: "2024-06-18",
    time: "10:00 AM",
    location: "Debate Room, Library",
    category: "Academic",
    description:
      "Witness intense debates on current global issues between different departments. Come and support your team or just enjoy the intellectual discourse.",
    organizer: { id: "o2", name: "Student Life Office" },
    imageUrl: "https://via.placeholder.com/600x400/ffc107/ffffff?text=Debate",
  },
];

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isStudent, isOrganizer } = useAuth();
  const { showToast } = useToast();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false); // Simulate registration status

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          const foundEvent = mockEvents.find((e) => e.id === id);
          setEvent(foundEvent);
          // Simulate registration status based on user and event ID
          if (foundEvent && user?.registeredEvents?.includes(foundEvent.id)) {
            setIsRegistered(true);
          }
          setLoading(false);
          resolve();
        }, 800); // Simulate network delay
      });
    };

    fetchEvent();
  }, [id, user]); // Re-fetch if user changes (e.g., login/logout)

  const handleRegister = () => {
    if (!isAuthenticated) {
      showToast("Please log in to register for an event.", "info");
      navigate("/login", { state: { from: `/events/${id}` } });
      return;
    }
    if (isOrganizer) {
      showToast("Organizers cannot register for events.", "warning");
      return;
    }

    // Simulate registration
    setIsRegistered(true);
    showToast(`Successfully registered for ${event.title}!`, "success");
    // In a real app, you'd update backend and AuthContext's user state
    // For now, assume a successful backend call.
  };

  const handleUnregister = () => {
    // Simulate unregistration
    setIsRegistered(false);
    showToast(`Unregistered from ${event.title}.`, "info");
    // In a real app, update backend
  };

  const handleEdit = () => {
    showToast("Edit functionality not implemented yet.", "info");
    // navigate to an edit form: navigate(`/organizer-dashboard/edit-event/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      showToast(`Event "${event.title}" deleted.`, "danger");
      navigate("/organizer-dashboard", { replace: true });
      // In a real app, call API to delete event
    }
  };

  if (loading) {
    return (
      <div className={`${styles.eventDetailsPage} container`}>
        <Card className={styles.loadingCard}>
          <Skeleton height="350px" className={styles.skeletonImage} />
          <div className={styles.content}>
            <Skeleton
              height="36px"
              width="80%"
              style={{ marginBottom: "16px" }}
            />
            <Skeleton
              height="24px"
              width="50%"
              style={{ marginBottom: "8px" }}
            />
            <Skeleton
              height="20px"
              width="90%"
              style={{ marginBottom: "24px" }}
            />
            <Skeleton count={4} height="20px" style={{ marginBottom: "8px" }} />
            <Skeleton
              height="48px"
              width="150px"
              style={{ marginTop: "24px", alignSelf: "center" }}
            />
          </div>
        </Card>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={`${styles.eventDetailsPage} container`}>
        <h2 className={styles.notFoundTitle}>Event Not Found</h2>
        <p className={styles.notFoundMessage}>
          The event you are looking for does not exist.
        </p>
        <Button onClick={() => navigate("/")} variant="secondary">
          Go to Event List
        </Button>
      </div>
    );
  }

  const isEventOrganizer = isOrganizer && user?.id === event.organizer.id; // More robust check needed for real app

  return (
    <div className={`${styles.eventDetailsPage} container`}>
      <Card className={styles.eventDetailsCard}>
        <div className={styles.imageContainer}>
          <img
            src={event.imageUrl}
            alt={event.title}
            className={styles.eventImage}
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.eventTitle}>{event.title}</h1>
          <p className={styles.organizerInfo}>
            <FaUser aria-hidden="true" className={styles.infoIcon} /> Organized
            by: <strong>{event.organizer.name}</strong>
          </p>

          <div className={styles.detailsGrid}>
            <p className={styles.detailItem}>
              <FaCalendarAlt aria-hidden="true" className={styles.infoIcon} />{" "}
              Date: <span>{new Date(event.date).toLocaleDateString()}</span>
            </p>
            <p className={styles.detailItem}>
              <FaClock aria-hidden="true" className={styles.infoIcon} /> Time:{" "}
              <span>{event.time}</span>
            </p>
            <p className={styles.detailItem}>
              <FaMapMarkerAlt aria-hidden="true" className={styles.infoIcon} />{" "}
              Location: <span>{event.location}</span>
            </p>
            <p className={styles.detailItem}>
              <FaTag aria-hidden="true" className={styles.infoIcon} /> Category:{" "}
              <span className={styles.categoryTag}>{event.category}</span>
            </p>
          </div>

          <p className={styles.eventDescription}>{event.description}</p>

          <div className={styles.actionButtons}>
            {isEventOrganizer ? (
              <>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className={styles.actionButton}
                >
                  <FaEdit aria-hidden="true" /> Edit Event
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                  className={styles.actionButton}
                >
                  <FaTrashAlt aria-hidden="true" /> Delete Event
                </Button>
              </>
            ) : (
              isStudent &&
              (isRegistered ? (
                <Button
                  onClick={handleUnregister}
                  variant="secondary"
                  className={styles.actionButton}
                >
                  <FaCheckCircle aria-hidden="true" /> Registered (Unregister)
                </Button>
              ) : (
                <Button
                  onClick={handleRegister}
                  variant="primary"
                  className={styles.actionButton}
                >
                  Register for Event
                </Button>
              ))
            )}
            {!isAuthenticated && (
              <Button
                onClick={() =>
                  navigate("/login", { state: { from: `/events/${id}` } })
                }
                variant="primary"
                className={styles.actionButton}
              >
                Login to Register
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventDetails;
