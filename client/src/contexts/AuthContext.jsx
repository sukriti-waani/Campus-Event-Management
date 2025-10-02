import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id: '...', email: '...', role: 'student' | 'organizer' }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage or a token for a logged-in user
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real app, you'd call your backend/Supabase here
    // For now, mock a successful login based on simple credentials
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "student@example.com" && password === "password") {
          const loggedInUser = {
            id: "student-123",
            email: email,
            role: "student",
          };
          setUser(loggedInUser);
          localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
          resolve(loggedInUser);
        } else if (
          email === "organizer@example.com" &&
          password === "password"
        ) {
          const loggedInUser = {
            id: "organizer-456",
            email: email,
            role: "organizer",
          };
          setUser(loggedInUser);
          localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
          resolve(loggedInUser);
        } else {
          reject(new Error("Invalid email or password."));
        }
      }, 1000);
    });
  };

  const register = async (email, password, role) => {
    // In a real app, you'd call your backend/Supabase here
    // For now, just simulate success
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && role) {
          // Check if user already exists (simple mock)
          if (
            email === "student@example.com" ||
            email === "organizer@example.com"
          ) {
            reject(new Error("User with this email already exists."));
            return;
          }
          const newUser = {
            id: `user-${Date.now()}`,
            email: email,
            role: role,
          };
          // In a real app, you wouldn't log them in directly after register without verification
          // For this mock, we'll auto-login
          setUser(newUser);
          localStorage.setItem("currentUser", JSON.stringify(newUser));
          resolve(newUser);
        } else {
          reject(new Error("Please provide email, password, and role."));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const isAuthenticated = !!user;
  const isStudent = user?.role === "student";
  const isOrganizer = user?.role === "organizer";

  const value = {
    user,
    isAuthenticated,
    isStudent,
    isOrganizer,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
