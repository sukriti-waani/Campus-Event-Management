import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag } from "react-icons/fa"; // react-icons
import { Link } from "react-router-dom";
import styles from "./EventList.module.css";
import { Button, Card, SearchBar, Skeleton } from "./ui";

// Mock data for events
const mockEvents = [
  {
    id: "e001",
    title: "Annual Tech Conference",
    date: "2024-05-15",
    time: "09:00 AM",
    location: "Campus Auditorium",
    category: "Academic",
    description:
      "A comprehensive tech conference covering AI, Machine Learning, and Web Development.",
    imageUrl:
      "https://via.placeholder.com/300x200/007bff/ffffff?text=Tech+Conf",
  },
  {
    id: "e002",
    title: "Freshers' Welcome Party",
    date: "2024-05-20",
    time: "07:00 PM",
    location: "Student Union Hall",
    category: "Social",
    description:
      "Get to know your fellow freshers at this exciting welcome party with music and food.",
    imageUrl:
      "https://via.placeholder.com/300x200/6c757d/ffffff?text=Welcome+Party",
  },
  {
    id: "e003",
    title: "Campus Charity Run",
    date: "2024-06-01",
    time: "08:00 AM",
    location: "Campus Grounds",
    category: "Sports",
    description:
      "Join us for a charity run to support local schools. All fitness levels welcome!",
    imageUrl:
      "https://via.placeholder.com/300x200/28a745/ffffff?text=Charity+Run",
  },
  {
    id: "e004",
    title: "Guest Lecture: Future of AI",
    date: "2024-06-05",
    time: "03:00 PM",
    location: "Lecture Hall 1",
    category: "Academic",
    description:
      "An insightful lecture by a leading expert on the advancements and future of Artificial Intelligence.",
    imageUrl:
      "https://via.placeholder.com/300x200/dc3545/ffffff?text=AI+Lecture",
  },
  {
    id: "e005",
    title: "Spring Art Exhibition",
    date: "2024-06-10",
    time: "02:00 PM",
    location: "University Gallery",
    category: "Arts & Culture",
    description:
      "Explore diverse artworks from talented student artists. Refreshments will be served.",
    imageUrl:
      "https://via.placeholder.com/300x200/17a2b8/ffffff?text=Art+Exhibition",
  },
  {
    id: "e006",
    title: "Inter-Department Debate Competition",
    date: "2024-06-18",
    time: "10:00 AM",
    location: "Debate Room, Library",
    category: "Academic",
    description:
      "Witness intense debates on current global issues between different departments.",
    imageUrl:
      "https://via.placeholder.com.com/300x200/ffc107/ffffff?text=Debate",
  },
];

const categories = ["All", "Academic", "Social", "Sports", "Arts & Culture"];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Simulate fetching events from an API
    const fetchEvents = async () => {
      setLoading(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          setEvents(mockEvents);
          setFilteredEvents(mockEvents); // Initially show all events
          setLoading(false);
          resolve();
        }, 1200); // Simulate network delay
      });
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Apply filters whenever search term or category changes
    let currentFiltered = events;

    if (searchTerm) {
      currentFiltered = currentFiltered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      currentFiltered = currentFiltered.filter(
        (event) => event.category === selectedCategory
      );
    }

    setFilteredEvents(currentFiltered);
  }, [searchTerm, selectedCategory, events]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={`${styles.eventListPage} container`}>
      <h1 className={styles.pageTitle}>Upcoming Campus Events</h1>

      <div className={styles.controls}>
        <SearchBar onSearch={handleSearch} className={styles.searchBar} />
        <div
          className={styles.categoryFilters}
          role="group"
          aria-label="Filter events by category"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category)}
              variant={selectedCategory === category ? "primary" : "secondary"}
              size="sm"
              aria-pressed={selectedCategory === category}
            >
              <FaTag aria-hidden="true" /> {category}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={styles.eventGrid}>
          {[...Array(6)].map((_, index) => (
            <Card key={index} className={styles.eventCard}>
              <Skeleton height="180px" className={styles.skeletonImage} />
              <div className={styles.cardContent}>
                <Skeleton
                  height="24px"
                  width="80%"
                  style={{ marginBottom: "8px" }}
                />
                <Skeleton
                  height="18px"
                  width="90%"
                  style={{ marginBottom: "4px" }}
                />
                <Skeleton height="18px" width="70%" />
                <Skeleton
                  height="40px"
                  width="100%"
                  style={{ marginTop: "16px" }}
                />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className={styles.eventGrid}>
          {filteredEvents.map((event) => (
            <Card key={event.id} className={styles.eventCard}>
              <img
                src={event.imageUrl}
                alt={`Poster for ${event.title}`}
                className={styles.eventImage}
                loading="lazy"
              />
              <div className={styles.cardContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDetail}>
                  <FaCalendarAlt
                    aria-hidden="true"
                    className={styles.detailIcon}
                  />
                  <span>
                    {new Date(event.date).toLocaleDateString()}, {event.time}
                  </span>
                </p>
                <p className={styles.eventDetail}>
                  <FaMapMarkerAlt
                    aria-hidden="true"
                    className={styles.detailIcon}
                  />
                  <span>{event.location}</span>
                </p>
                <Link to={`/events/${event.id}`}>
                  <Button
                    variant="primary"
                    size="md"
                    className={styles.viewDetailsButton}
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
          No events found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default EventList;
