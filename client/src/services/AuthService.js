const API_URL = "http://localhost:5000/api"; // Adjust if your backend runs on a different port/url

const AuthService = {
  signup: async (username, email, password, role) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Signup failed");
      }
      return data; // Contains success message
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Login failed");
      }
      return data; // Contains { token, user: { id, username, email, role } }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // A generic function to make authenticated requests
  // Will be useful for student registration, event creation/editing
  authenticatedRequest: async (url, method, body = null) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const config = {
      method: method,
      headers: headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
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
};

export default AuthService;
