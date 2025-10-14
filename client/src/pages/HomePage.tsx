import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
  organizer?: { username: string };
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [message, setMessage] = useState("");
  const { isAuthenticated, isStudent } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load events.");
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!isAuthenticated || !isStudent) {
      setMessage("You must be logged in as a student to register.");
      return;
    }
    try {
      await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if using cookies for auth
      });
      setMessage("Successfully registered for the event!");
      fetchEvents();
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "Failed to register for the event.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">All Events</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            date={new Date(event.date).toLocaleDateString()}
            location={event.location}
            category={event.category || "General"}
            image={event.image || "/placeholder.jpg"}
            attendees={event.attendees || 0}
            onRegister={() => handleRegister(event._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
