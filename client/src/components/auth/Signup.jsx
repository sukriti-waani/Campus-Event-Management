import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added Link
import AuthService from "../../services/AuthService";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const data = await AuthService.signup(username, email, password, role);
      setMessage(data.msg || "User registered successfully. Please log in.");
      setTimeout(() => {
        // Give user time to read success message
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mt-12 border border-gray-100">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Create Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Choose a username"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="your@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter a strong password"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            I am a
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="student">Student</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Signup"} Signup
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-6 text-center text-sm font-medium p-3 rounded-md ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
