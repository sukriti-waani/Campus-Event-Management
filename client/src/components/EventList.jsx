import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight, Sparkles, ListFilter as Filter } from "lucide-react";
import { SearchBar } from './ui';
import { EventCardSkeleton } from './ui/Skeleton';
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

const categories = ['All', 'Technology', 'Cultural', 'Sports'];

export default function EventList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <div className={styles.heroBadge}>
            <Sparkles className="h-5 w-5 text-primary-600" aria-hidden="true" />
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

        <div className="max-w-6xl mx-auto px-4 mb-8 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search events by title or location..."
            className="w-full"
          />

          <div className="flex items-center gap-4 flex-wrap" role="group" aria-label="Filter events by category">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Filter className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Category:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-primary-500'
                  }
                `}
                aria-pressed={selectedCategory === category}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.eventsGrid} mdGridCols2 lgGridCols3`}>
          {loading ? (
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          ) : filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Events Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <article
                key={event.id}
                className={styles.eventCard}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/event/${event.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/event/${event.id}`);
                  }
                }}
                aria-label={`View details for ${event.title}`}
              >
                <div className={styles.eventImageContainer}>
                  <img
                    src={event.image}
                    alt={`${event.title} event`}
                    className={styles.eventImage}
                    loading="lazy"
                  />
                  <div className={styles.eventImageOverlay} />
                  <div className={`${styles.eventCategory} ${styles[`category${event.category}`]}`}>
                    {event.category}
                  </div>
                  <div className={styles.eventTitle}>
                    <h3>{event.title}</h3>
                  </div>
                </div>

                <div className={styles.eventContent}>
                  <div className={styles.eventMeta}>
                    <div className={styles.eventMetaItem}>
                      <Calendar className="h-4 w-4" style={{ color: 'var(--primary-600)' }} aria-hidden="true" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className={styles.eventMetaItem}>
                      <MapPin className="h-4 w-4" style={{ color: 'var(--secondary-600)' }} aria-hidden="true" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className={styles.eventFooter}>
                    <div className={styles.eventAttendees}>
                      <Users className="h-4 w-4" style={{ color: 'var(--accent-600)' }} aria-hidden="true" />
                      <span>{event.attendees} attending</span>
                    </div>

                    <div className={styles.eventViewDetails}>
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}>
              <Calendar className="h-16 w-16" aria-hidden="true" />
            </div>
            <h2 className={`${styles.ctaTitle} gradient-text`}>
              Ready to Join the Fun?
            </h2>
            <p className={styles.ctaDescription}>
              Don't miss out on amazing campus events. Register now and be part of something special!
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className={styles.ctaButton}
              aria-label="Navigate to my dashboard"
            >
              View My Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
