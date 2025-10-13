// client/src/pages/HomePage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Campus Event Management!</h1>
      {user ? (
        <p>You are logged in as {user.name} ({user.role}).</p>
      ) : (
        <p>Please log in or register to manage and participate in events.</p>
      )}
      <p>Explore exciting events happening on campus!</p>
      {/* You can add more content or links here */}
    </div>
  );
};

export default HomePage;