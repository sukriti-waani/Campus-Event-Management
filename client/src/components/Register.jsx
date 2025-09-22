import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Register() {
  const { eventName } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];
    registrations.push({ name, email, event: eventName });
    localStorage.setItem("registrations", JSON.stringify(registrations));
    alert(`Successfully registered for ${eventName}`);
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Event Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email / Roll No:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Event:</label>
        <input type="text" value={eventName} readOnly />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
