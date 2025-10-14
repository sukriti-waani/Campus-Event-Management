// frontend/src/pages/OrganizerDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthService from "../services/AuthService";

const OrganizerDashboard = () => {
  const { isAuthenticated, isOrganizer, user } = useAuth();
  const navigate = useNavigate();
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !isOrganizer) {
      navigate("/login");
      return;
    }
    fetchOrganizerEvents();
  }, [isAuthenticated, isOrganizer, navigate]);

  const fetchOrganizerEvents = async () => {
    try {
      const data = await AuthService.authenticatedRequest(
        "http://localhost:5000/api/events/organizer/events",
        "GET"
      );
      setPastEvents(data.past);
      setUpcomingEvents(data.upcoming);
    } catch (error) {
      console.error("Error fetching organizer events:", error);
      setMessage(error.message || "Failed to load your events.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await AuthService.authenticatedRequest(
        "http://localhost:5000/api/events",
        "POST",
        newEventData
      );
      setMessage("Event created successfully!");
      setNewEventData({ title: "", description: "", date: "", location: "" });
      setShowCreateForm(false);
      fetchOrganizerEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage(error.message || "Failed to create event.");
    }
  };

  const handleEditClick = (event) => {
    setCurrentEvent(event);
    setNewEventData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split("T")[0],
      location: event.location,
    });
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!currentEvent) return;
    try {
      await AuthService.authenticatedRequest(
        `http://localhost:5000/api/events/${currentEvent._id}`,
        "PUT",
        newEventData
      );
      setMessage("Event updated successfully!");
      setCurrentEvent(null);
      setNewEventData({ title: "", description: "", date: "", location: "" });
      setShowEditForm(false);
      fetchOrganizerEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      setMessage(error.message || "Failed to update event.");
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await AuthService.authenticatedRequest(
          `http://localhost:5000/api/events/${eventId}`,
          "DELETE"
        );
        setMessage("Event deleted successfully!");
        fetchOrganizerEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
        setMessage(error.message || "Failed to delete event.");
      }
    }
  };

  return (
    <div>
      <h2>Organizer Dashboard</h2>
      {message && <p>{message}</p>}

      <button
        onClick={() => {
          setShowCreateForm(true);
          setShowEditForm(false);
        }}
      >
        Create New Event
      </button>

      {showCreateForm && (
        <div>
          <h3>Create Event</h3>
          <form onSubmit={handleCreateSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newEventData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={newEventData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={newEventData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={newEventData.location}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Add Event</button>
            <button type="button" onClick={() => setShowCreateForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {showEditForm && currentEvent && (
        <div>
          <h3>Edit Event: {currentEvent.title}</h3>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newEventData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={newEventData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={newEventData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={newEventData.location}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update Event</button>
            <button
              type="button"
              onClick={() => {
                setShowEditForm(false);
                setCurrentEvent(null);
                setNewEventData({
                  title: "",
                  description: "",
                  date: "",
                  location: "",
                });
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <h3>Upcoming Events ({upcomingEvents.length})</h3>
      {upcomingEvents.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <ul>
          {upcomingEvents.map((event) => (
            <li key={event._id}>
              <h4>{event.title}</h4>
              <p>
                {new Date(event.date).toLocaleDateString()} - {event.location}
              </p>
              <button onClick={() => handleEditClick(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
              <p>Attendees: {event.attendees.length}</p>
            </li>
          ))}
        </ul>
      )}

      <h3>Past Events ({pastEvents.length})</h3>
      {pastEvents.length === 0 ? (
        <p>No past events.</p>
      ) : (
        <ul>
          {pastEvents.map((event) => (
            <li key={event._id}>
              <h4>{event.title}</h4>
              <p>
                {new Date(event.date).toLocaleDateString()} - {event.location}
              </p>
              <p>Attendees: {event.attendees.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrganizerDashboard;
