import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Edit3, 
  Save, 
  X, 
  Mail, 
  User,
  Download,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import styles from './OrganizerDashboard.module.css';

const initialEvents = [
  {
    id: 1,
    title: "TechFest 2025",
    date: "2025-10-05",
    time: "10:00 AM",
    location: "Auditorium",
    organizer: "Tech Club",
    deadline: "2025-10-03",
    maxAttendees: 300,
    category: "Technology"
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "2025-10-10",
    time: "6:00 PM",
    location: "Main Hall",
    organizer: "Cultural Society",
    deadline: "2025-10-08",
    maxAttendees: 200,
    category: "Cultural"
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-10-15",
    time: "9:00 AM",
    location: "Sports Ground",
    organizer: "Sports Committee",
    deadline: "2025-10-12",
    maxAttendees: 400,
    category: "Sports"
  }
];

export default function OrganizerDashboard() {
  const [events, setEvents] = useState(initialEvents);
  const [registrations, setRegistrations] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in as organizer
    const userType = localStorage.getItem("userType");
    if (userType !== "organizer") {
      navigate("/login");
      return;
    }

    // Load registrations from localStorage
    const stored = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(stored);
  }, [navigate]);

  const handleEditEvent = (event) => {
    setEditingEvent({ ...event });
  };

  const handleSaveEvent = () => {
    setEvents(events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    setEditingEvent(null);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterEvent === "all" || reg.event === filterEvent;
    return matchesSearch && matchesFilter;
  });

  const getEventStats = () => {
    const stats = {};
    events.forEach(event => {
      const eventRegistrations = registrations.filter(reg => reg.event === event.title);
      stats[event.title] = {
        registered: eventRegistrations.length,
        capacity: event.maxAttendees,
        percentage: Math.round((eventRegistrations.length / event.maxAttendees) * 100)
      };
    });
    return stats;
  };

  const eventStats = getEventStats();
  const totalRegistrations = registrations.length;
  const totalCapacity = events.reduce((sum, event) => sum + event.maxAttendees, 0);

  const exportRegistrations = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Event,Registration Date\n" +
      filteredRegistrations.map(reg => 
        `${reg.name},${reg.email},${reg.event},${new Date(reg.date).toLocaleDateString()}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "event_registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <div className={styles.headerIcon}>
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={styles.headerTitle}>Organizer Dashboard</h1>
                <p className={styles.headerDescription}>Manage events and track registrations</p>
              </div>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
              <Users className="h-6 w-6" />
            </div>
            <h3 className={styles.statNumber}>{totalRegistrations}</h3>
            <p className={styles.statLabel}>Total Registrations</p>
          </div>
          
          <div className={styles.statCard} style={{ animationDelay: '0.1s' }}>
            <div className={`${styles.statIcon} ${styles.statIconSecondary}`}>
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className={styles.statNumber}>{events.length}</h3>
            <p className={styles.statLabel}>Active Events</p>
          </div>
          
          <div className={styles.statCard} style={{ animationDelay: '0.2s' }}>
            <div className={`${styles.statIcon} ${styles.statIconSuccess}`}>
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className={styles.statNumber}>{Math.round((totalRegistrations / totalCapacity) * 100)}%</h3>
            <p className={styles.statLabel}>Overall Capacity</p>
          </div>
        </div>

        {/* Events Management */}
        <div className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>Event Management</h2>
          <div className={styles.eventsList}>
            {events.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                {editingEvent && editingEvent.id === event.id ? (
                  // Edit Mode
                  <div className={styles.editForm}>
                    <div className={styles.editHeader}>
                      <h3 className={styles.editTitle}>Edit Event</h3>
                      <div className={styles.editActions}>
                        <button onClick={handleSaveEvent} className={styles.saveButton}>
                          <Save className="h-4 w-4" />
                          Save
                        </button>
                        <button onClick={handleCancelEdit} className={styles.cancelButton}>
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                    
                    <div className={styles.editFields}>
                      <div className={styles.editField}>
                        <label className={styles.editLabel}>Event Title</label>
                        <input
                          type="text"
                          value={editingEvent.title}
                          onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                          className={styles.editInput}
                        />
                      </div>
                      
                      <div className={styles.editFieldRow}>
                        <div className={styles.editField}>
                          <label className={styles.editLabel}>Date</label>
                          <input
                            type="date"
                            value={editingEvent.date}
                            onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                            className={styles.editInput}
                          />
                        </div>
                        <div className={styles.editField}>
                          <label className={styles.editLabel}>Time</label>
                          <input
                            type="text"
                            value={editingEvent.time}
                            onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                            className={styles.editInput}
                          />
                        </div>
                      </div>
                      
                      <div className={styles.editField}>
                        <label className={styles.editLabel}>Venue</label>
                        <input
                          type="text"
                          value={editingEvent.location}
                          onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                          className={styles.editInput}
                        />
                      </div>
                      
                      <div className={styles.editField}>
                        <label className={styles.editLabel}>Max Attendees</label>
                        <input
                          type="number"
                          value={editingEvent.maxAttendees}
                          onChange={(e) => setEditingEvent({...editingEvent, maxAttendees: parseInt(e.target.value)})}
                          className={styles.editInput}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className={styles.eventContent}>
                    <div className={styles.eventHeader}>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <button 
                        onClick={() => handleEditEvent(event)}
                        className={styles.editButton}
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>
                    </div>
                    
                    <div className={styles.eventDetails}>
                      <div className={styles.eventDetail}>
                        <Calendar className="h-4 w-4 text-primary-600" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className={styles.eventDetail}>
                        <MapPin className="h-4 w-4 text-secondary-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className={styles.eventDetail}>
                        <Users className="h-4 w-4 text-accent-600" />
                        <span>{eventStats[event.title]?.registered || 0} / {event.maxAttendees} registered</span>
                      </div>
                    </div>
                    
                    <div className={styles.eventProgress}>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill}
                          style={{ width: `${eventStats[event.title]?.percentage || 0}%` }}
                        ></div>
                      </div>
                      <span className={styles.progressText}>
                        {eventStats[event.title]?.percentage || 0}% capacity
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Registrations Management */}
        <div className={styles.registrationsSection}>
          <div className={styles.registrationsHeader}>
            <h2 className={styles.sectionTitle}>Student Registrations</h2>
            <button onClick={exportRegistrations} className={styles.exportButton}>
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            <div className={styles.searchContainer}>
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterContainer}>
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Events</option>
                {events.map(event => (
                  <option key={event.id} value={event.title}>{event.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Registrations Table */}
          <div className={styles.registrationsTable}>
            {filteredRegistrations.length === 0 ? (
              <div className={styles.emptyState}>
                <Users className="h-16 w-16 text-gray-300" />
                <h3 className={styles.emptyTitle}>No Registrations Found</h3>
                <p className={styles.emptyText}>
                  {searchTerm || filterEvent !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "No students have registered for events yet."
                  }
                </p>
              </div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th className={styles.tableHeaderCell}>Student</th>
                      <th className={styles.tableHeaderCell}>Event</th>
                      <th className={styles.tableHeaderCell}>Registration Date</th>
                      <th className={styles.tableHeaderCell}>Status</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tableBody}>
                    {filteredRegistrations.map((registration, index) => (
                      <tr key={index} className={styles.tableRow}>
                        <td className={styles.tableCell}>
                          <div className={styles.studentInfo}>
                            <div className={styles.studentAvatar}>
                              <User className="h-4 w-4" />
                            </div>
                            <div>
                              <p className={styles.studentName}>{registration.name}</p>
                              <p className={styles.studentEmail}>{registration.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.eventBadge}>{registration.event}</span>
                        </td>
                        <td className={styles.tableCell}>
                          <div className={styles.dateInfo}>
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{new Date(registration.date).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.statusBadge}>
                            <CheckCircle className="h-4 w-4" />
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}