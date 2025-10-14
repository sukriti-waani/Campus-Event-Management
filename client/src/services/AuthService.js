const API_URL = "http://localhost:5000/api/auth"; // Updated to match backend

const AuthService = {
  // --------------------
  // Signup
  // --------------------
  signup: async (username, email, password, role) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Signup failed");
      }

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // --------------------
  // Login
  // --------------------
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login failed");
      }

      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // --------------------
  // Authenticated requests (GET, POST, PUT, DELETE)
  // --------------------
  authenticatedRequest: async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found.");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.msg || `Request failed with status ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("Authenticated request error:", error);
      throw error;
    }
  },

  // --------------------
  // Logout
  // --------------------
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default AuthService;
