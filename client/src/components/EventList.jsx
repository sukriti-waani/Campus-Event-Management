import { useNavigate } from "react-router-dom";

const events = [
  { id: 1, title: "TechFest 2025", date: "2025-10-05", location: "Auditorium" },
  { id: 2, title: "Cultural Night", date: "2025-10-10", location: "Main Hall" },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-10-15",
    location: "Sports Ground",
  },
];

export default function EventList() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.map((e) => (
        <div
          key={e.id}
          style={{ border: "1px solid #ccc", margin: "8px", padding: "7px" }}
        >
          <h3>{e.title}</h3>
          <p>
            {e.date} - {e.location}
          </p>
          <button onClick={() => navigate(`/event/${e.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
