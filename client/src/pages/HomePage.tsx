import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";

interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location: string;
  category?: string;
  image?: string; // Add image field
  attendees?: string[]; // Assuming attendees are stored as an array of user IDs (strings)
  organizer?: { username: string };
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, isStudent } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // This URL is correct for the backend setup above
      const response = await fetch("http://localhost:5000/api/events/upcoming");
      if (!response.ok) {
        // Read error message from backend if available
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch events.");
      }
      const data = await response.json();
      setEvents(data);
    } catch (err: any) {
      console.error("Error fetching events:", err);
      setError(err.message || "Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!isAuthenticated || !isStudent) {
      setMessage("You must be logged in as a student to register.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if using cookies for JWT
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed."); // Use 'message' from backend
      }

      setMessage("Successfully registered for the event!");
      fetchEvents(); // Refresh events to show updated attendee count/status
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Failed to register for the event.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Upcoming Campus Events
      </h2>

      {message && (
        <p className="text-center text-sm text-blue-600 mb-4 font-medium">
          {message}
        </p>
      )}

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.title}
              date={new Date(event.date).toLocaleDateString()}
              time={event.time}
              location={event.location}
              category={event.category || "General"}
              image={event.image || "/placeholder.jpg"}
              attendees={event.attendees ? event.attendees.length : 0} // Pass count
              onRegister={() => handleRegister(event._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;