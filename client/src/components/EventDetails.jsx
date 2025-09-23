import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, User, Users, ArrowLeft, Star, Share2 } from "lucide-react";
import styles from './EventDetails.module.css';

const events = [
  {
    id: 1,
    title: "TechFest 2025",
    date: "2025-10-05",
    time: "10:00 AM",
    location: "Auditorium",
    organizer: "Tech Club",
    deadline: "2025-10-03",
    desc: "Annual tech showcase with coding, robotics, and AI challenges. Join us for an exciting day of innovation and technology.",
    category: "Technology",
    attendees: 250,
    maxAttendees: 300,
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: ["Coding Competition", "AI Workshop", "Robotics Demo", "Tech Talks"],
    rating: 4.8
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "2025-10-10",
    time: "6:00 PM",
    location: "Main Hall",
    organizer: "Cultural Society",
    deadline: "2025-10-08",
    desc: "Dance, drama & music performances showcasing the rich cultural diversity of our campus community.",
    category: "Cultural",
    attendees: 180,
    maxAttendees: 200,
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: ["Dance Performances", "Drama Shows", "Music Concert", "Cultural Food"],
    rating: 4.9
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-10-15",
    time: "9:00 AM",
    location: "Sports Ground",
    organizer: "Sports Committee",
    deadline: "2025-10-12",
    desc: "Competitions in athletics, football, cricket and more. Show your sporting spirit and compete for glory!",
    category: "Sports",
    attendees: 320,
    maxAttendees: 400,
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: ["Athletics", "Football", "Cricket", "Basketball"],
    rating: 4.7
  },
];

const categoryColors = {
  Technology: "from-primary-500 to-primary-600",
  Cultural: "from-secondary-500 to-secondary-600",
  Sports: "from-accent-500 to-accent-600",
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h1 className={styles.notFoundTitle}>Event Not Found</h1>
          <p className={styles.notFoundText}>The event you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className={styles.notFoundButton}>
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className={styles.backButton}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Events</span>
        </button>

        <div className={`${styles.mainGrid} lgGridCols3`}>
          {/* Main Content */}
          <div className={styles.mainContent} style={{ gridColumn: 'span 2' }}>
            {/* Hero Image */}
            <div className={styles.heroImage}>
              <img
                src={event.image}
                alt={event.title}
                className={styles.heroImageImg}
              />
              <div className={styles.heroImageOverlay} />
              <div className={`${styles.heroCategory} ${styles[`category${event.category}`]}`}>
                {event.category}
              </div>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>{event.title}</h1>
                <div className={styles.heroMeta}>
                  <div className={styles.heroMetaItem}>
                    <Star className={`h-5 w-5 ${styles.heroRating}`} style={{ fill: 'currentColor' }} />
                    <span>{event.rating}</span>
                  </div>
                  <div className={styles.heroMetaItem}>
                    <Users className="h-5 w-5" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className={styles.descriptionCard}>
              <h2 className={styles.descriptionTitle}>About This Event</h2>
              <p className={styles.descriptionText}>{event.desc}</p>
              
              {/* Highlights */}
              <h3 className={styles.highlightsTitle}>Event Highlights</h3>
              <div className={styles.highlightsGrid}>
                {event.highlights.map((highlight, index) => (
                  <div key={index} className={styles.highlightItem}>
                    <div className={styles.highlightDot}></div>
                    <span className={styles.highlightText}>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Event Info Card */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Event Details</h3>
              
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <div className={`${styles.detailIcon} ${styles.detailIconPrimary}`}>
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className={styles.detailContent}>
                    <p className={styles.detailLabel}>Date</p>
                    <p className={styles.detailValue}>{event.date}</p>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={`${styles.detailIcon} ${styles.detailIconSecondary}`}>
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className={styles.detailContent}>
                    <p className={styles.detailLabel}>Time</p>
                    <p className={styles.detailValue}>{event.time}</p>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={`${styles.detailIcon} ${styles.detailIconAccent}`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className={styles.detailContent}>
                    <p className={styles.detailLabel}>Venue</p>
                    <p className={styles.detailValue}>{event.location}</p>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={`${styles.detailIcon} ${styles.detailIconSuccess}`}>
                    <User className="h-5 w-5" />
                  </div>
                  <div className={styles.detailContent}>
                    <p className={styles.detailLabel}>Organizer</p>
                    <p className={styles.detailValue}>{event.organizer}</p>
                  </div>
                </div>
              </div>

              {/* Registration Deadline */}
              <div className={styles.deadlineNotice}>
                <p className={styles.deadlineText}>
                  <strong>Registration Deadline:</strong> {event.deadline}
                </p>
              </div>
            </div>

            {/* Attendance Card */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.attendanceTitle}>Attendance</h3>
              <div className={styles.attendanceStats}>
                <div className={styles.attendanceNumbers}>
                  <span className={styles.attendanceLabel}>Registered</span>
                  <span className={styles.attendanceValue}>{event.attendees}/{event.maxAttendees}</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${attendancePercentage}%` }}
                  ></div>
                </div>
                <p className={styles.attendancePercentage}>
                  {Math.round(attendancePercentage)}% capacity filled
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <a
                onClick={() => navigate(`/register/${event.title}`)}
                className={styles.registerButton}
              >
                Register Now
              </a>
              
              <button className={styles.shareButton}>
                <Share2 className="h-5 w-5" />
                <span>Share Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}