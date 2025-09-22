import { useState } from "react";

export default function Feedback() {
  const [eventName, setEventName] = useState("");
  const [rating, setRating] = useState("5");
  const [suggestions, setSuggestions] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setEventName("");
    setRating("5");
    setSuggestions("");
  }

  return (
    <div>
      <h1>Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <label>Event Name:</label>
        <input
          type="text"
          required
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <br />
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
          <option value="4">⭐️⭐️⭐️⭐️</option>
          <option value="3">⭐️⭐️⭐️</option>
          <option value="2">⭐️⭐️</option>
          <option value="1">⭐️</option>
        </select>
        <br />
        <label>Suggestions:</label>
        <textarea
          rows="4"
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
