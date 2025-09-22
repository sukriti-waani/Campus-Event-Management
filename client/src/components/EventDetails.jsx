import { useNavigate, useParams } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "TechFest 2025",
    date: "2025-10-05",
    time: "10:00 AM",
    location: "Auditorium",
    organizer: "Tech Club",
    deadline: "2025-10-03",
    desc: "Annual tech showcase with coding, robotics, and AI challenges.",
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "2025-10-10",
    time: "6:00 PM",
    location: "Main Hall",
    organizer: "Cultural Society",
    deadline: "2025-10-08",
    desc: "Dance, drama & music performances.",
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-10-15",
    time: "9:00 AM",
    location: "Sports Ground",
    organizer: "Sports Committee",
    deadline: "2025-10-12",
    desc: "Competitions in athletics, football, cricket.",
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === parseInt(id));

  return (
    <div>
      <h1>Event Details</h1>
      {event ? (
        <>
          <h2>{event.title}</h2>
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Venue:</strong> {event.location}
          </p>
          <p>
            <strong>Organizer:</strong> {event.organizer}
          </p>
          <p>
            <strong>Deadline:</strong> {event.deadline}
          </p>
          <p>
            <strong>About:</strong> {event.desc}
          </p>
          <button onClick={() => navigate(`/register/${event.title}`)}>
            Register for this Event
          </button>
        </>
      ) : (
        <p>No event found!</p>
      )}
    </div>
  );
}
