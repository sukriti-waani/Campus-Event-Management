import { useState } from "react";
import { Link } from "react-router-dom"; // Added Link
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const data = await AuthService.login(email, password);
      login(data.user, data.token); // Store user data and token in context and localStorage
      // navigate('/') is handled by AuthContext's login function
    } catch (error) {
      setMessage(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mt-12 border border-gray-100">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Welcome Back!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-6 text-center text-sm font-medium p-3 rounded-md ${
            message.toLowerCase().includes("failed")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
