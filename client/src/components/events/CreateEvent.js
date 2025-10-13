// src/components/Events/CreateEvent.js (Example snippet)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (userInfo && userInfo.role !== "organizer") {
      setError("Only organizers can create events.");
      return;
    }

    try {
      await API.post("/events", { title, description, date, location });
      navigate("/events"); // Redirect to event list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  if (!userInfo) return <div>Loading...</div>; // Or redirect
  if (userInfo.role !== "organizer")
    return <div>You are not authorized to create events.</div>;

  return (
    <div>
      <h2>Create New Event</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
