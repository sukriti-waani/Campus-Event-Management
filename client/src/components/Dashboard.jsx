export default function Dashboard() {
  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  return (
    <div>
      <h1>Your Dashboard</h1>
      <h2>My Registered Events</h2>
      <ul>
        {registrations.length === 0 ? (
          <li>No events registered yet.</li>
        ) : (
          registrations.map((r, idx) => (
            <li key={idx}>
              {r.event} - Registered by {r.name} ({r.email})
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
