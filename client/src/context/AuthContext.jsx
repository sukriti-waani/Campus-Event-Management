import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom v6+

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { id, username, email, role }
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage if token exists
    if (token) {
      try {
        // In a real app, you might want to verify the token on the backend
        // or decode it here if it's safe to expose payload on frontend.
        // For simplicity, we'll store basic user info from login response.
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        logout(); // Clear invalid data
      }
    }
  }, [token]);

  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
    navigate("/"); // Redirect to homepage after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  const isAuthenticated = !!token && !!user;
  const isStudent = isAuthenticated && user.role === "student";
  const isOrganizer = isAuthenticated && user.role === "organizer";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isStudent,
        isOrganizer,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
