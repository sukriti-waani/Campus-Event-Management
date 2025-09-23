import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import styles from './EventList.module.css';

const events = [
  { 
    id: 1, 
    title: "TechFest 2025", 
    date: "2025-10-05", 
    location: "Auditorium",
    category: "Technology",
    attendees: 250,
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: 2, 
    title: "Cultural Night", 
    date: "2025-10-10", 
    location: "Main Hall",
    category: "Cultural",
    attendees: 180,
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-10-15",
    location: "Sports Ground",
    category: "Sports",
    attendees: 320,
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
];

const categoryColors = {
  Technology: "from-primary-500 to-primary-600",
  Cultural: "from-secondary-500 to-secondary-600",
  Sports: "from-accent-500 to-accent-600",
};

export default function EventList() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroBadge}>
            <Sparkles className="h-5 w-5 text-primary-600" />
            <span className={styles.heroBadgeText}>Discover Amazing Events</span>
          </div>
          <h1 className={`${styles.heroTitle} gradient-text`}>
            Campus Events
          </h1>
          <p className={styles.heroDescription}>
            Join exciting events, connect with peers, and create unforgettable memories. 
            Your campus adventure starts here!
          </p>
        </div>

        {/* Events Grid */}
        <div className={`${styles.eventsGrid} mdGridCols2 lgGridCols3`}>
          {events.map((event, index) => (
            <div
              key={event.id}
              className={styles.eventCard}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/event/${event.id}`)}
            >
              {/* Event Image */}
              <div className={styles.eventImageContainer}>
                <img
                  src={event.image}
                  alt={event.title}
                  className={styles.eventImage}
                />
                <div className={styles.eventImageOverlay} />
                <div className={`${styles.eventCategory} ${styles[`category${event.category}`]}`}>
                  {event.category}
                </div>
                <div className={styles.eventTitle}>
                  <h3>{event.title}</h3>
                </div>
              </div>

              {/* Event Details */}
              <div className={styles.eventContent}>
                <div className={styles.eventMeta}>
                  <div className={styles.eventMetaItem}>
                    <Calendar className="h-4 w-4" style={{ color: 'var(--primary-600)' }} />
                    <span>{event.date}</span>
                  </div>
                  <div className={styles.eventMetaItem}>
                    <MapPin className="h-4 w-4" style={{ color: 'var(--secondary-600)' }} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className={styles.eventFooter}>
                  <div className={styles.eventAttendees}>
                    <Users className="h-4 w-4" style={{ color: 'var(--accent-600)' }} />
                    <span>{event.attendees} attending</span>
                  </div>
                  
                  <div className={styles.eventViewDetails}>
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.cta}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}>
              <Calendar className="h-16 w-16" />
            </div>
            <h2 className={`${styles.ctaTitle} gradient-text`}>
              Ready to Join the Fun?
            </h2>
            <p className={styles.ctaDescription}>
              Don't miss out on amazing campus events. Register now and be part of something special!
            </p>
            <a
              onClick={() => navigate('/dashboard')}
              className={styles.ctaButton}
            >
              View My Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}