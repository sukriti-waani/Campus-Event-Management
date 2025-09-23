import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, User, Mail, Trash2, CheckCircle, Clock, MapPin } from "lucide-react";
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(stored);

    // Show success message if coming from registration
    if (location.state?.showSuccess) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [location]);

  const handleRemoveRegistration = (index) => {
    const updated = registrations.filter((_, i) => i !== index);
    setRegistrations(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  const getEventStatus = (eventName) => {
    const eventDates = {
      "TechFest 2025": "2025-10-05",
      "Cultural Night": "2025-10-10",
      "Sports Meet": "2025-10-15"
    };
    
    const eventDate = new Date(eventDates[eventName]);
    const today = new Date();
    
    if (eventDate > today) {
      return { status: "upcoming", color: "text-blue-600 bg-blue-100", icon: Clock };
    } else {
      return { status: "completed", color: "text-green-600 bg-green-100", icon: CheckCircle };
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Success Message */}
        {showSuccess && (
          <div className={styles.successMessage}>
            <div className={styles.successCard}>
              <CheckCircle className="h-6 w-6" style={{ color: 'var(--success-600)' }} />
              <div>
                <p className={styles.successTitle}>Registration Successful!</p>
                <p className={styles.successText}>You've been registered for {location.state?.eventName}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className={`${styles.headerTitle} gradient-text`}>Your Dashboard</h1>
          <p className={styles.headerDescription}>Manage your event registrations and stay updated</p>
        </div>

        {/* Stats Cards */}
        <div className={`${styles.statsGrid} mdGridCols3`}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className={styles.statNumber}>{registrations.length}</h3>
            <p className={styles.statLabel}>Total Registrations</p>
          </div>
          
          <div className={styles.statCard} style={{ animationDelay: '0.1s' }}>
            <div className={`${styles.statIcon} ${styles.statIconSecondary}`}>
              <Clock className="h-6 w-6" />
            </div>
            <h3 className={styles.statNumber}>
              {registrations.filter(r => getEventStatus(r.event).status === 'upcoming').length}
            </h3>
            <p className={styles.statLabel}>Upcoming Events</p>
          </div>
          
          <div className={styles.statCard} style={{ animationDelay: '0.2s' }}>
            <div className={`${styles.statIcon} ${styles.statIconSuccess}`}>
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className={styles.statNumber}>
              {registrations.filter(r => getEventStatus(r.event).status === 'completed').length}
            </h3>
            <p className={styles.statLabel}>Completed Events</p>
          </div>
        </div>

        {/* Registrations List */}
        <div className={styles.registrationsCard}>
          <h2 className={styles.registrationsTitle}>My Registered Events</h2>
          
          {registrations.length === 0 ? (
            <div className={styles.emptyState}>
              <Calendar className={`h-16 w-16 ${styles.emptyIcon}`} />
              <h3 className={styles.emptyTitle}>No Events Registered</h3>
              <p className={styles.emptyText}>You haven't registered for any events yet.</p>
              <button
                onClick={() => window.location.href = '/'}
                className={styles.emptyButton}
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div className={styles.registrationsList}>
              {registrations.map((registration, index) => {
                const eventStatus = getEventStatus(registration.event);
                const StatusIcon = eventStatus.icon;
                
                return (
                  <div
                    key={index}
                    className={styles.registrationItem}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.registrationHeader}>
                      <div className={styles.registrationTitleRow}>
                        <h3 className={styles.registrationTitle}>{registration.event}</h3>
                        <span className={`${styles.statusBadge} ${styles[`status${eventStatus.status.charAt(0).toUpperCase() + eventStatus.status.slice(1)}`]}`}>
                          <StatusIcon className="h-4 w-4" />
                          <span>{eventStatus.status.charAt(0).toUpperCase() + eventStatus.status.slice(1)}</span>
                        </span>
                      </div>
                      
                      <div className={`${styles.registrationDetails} mdGridCols2`}>
                        <div className={styles.registrationDetail}>
                          <User className={`h-4 w-4 ${styles.registrationDetailIcon}`} />
                          <span><strong>Name:</strong> {registration.name}</span>
                        </div>
                        <div className={styles.registrationDetail}>
                          <Mail className={`h-4 w-4 ${styles.registrationDetailIconSecondary}`} />
                          <span><strong>Email:</strong> {registration.email}</span>
                        </div>
                        {registration.date && (
                          <div className={styles.registrationDetail}>
                            <Calendar className={`h-4 w-4 ${styles.registrationDetailIconAccent}`} />
                            <span><strong>Registered:</strong> {new Date(registration.date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.registrationActions}>
                      <button
                        onClick={() => handleRemoveRegistration(index)}
                        className={styles.cancelButton}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}