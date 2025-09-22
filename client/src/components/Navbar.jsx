import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/feedback">Feedback</Link> | <Link to="/login">Login</Link>
    </nav>
  );
}
