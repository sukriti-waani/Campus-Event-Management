// client/src/api/auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ensure this matches your backend URL

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'organizer';
  token: string;
  // Add other properties as your backend sends them
}

export const loginUser = async (email: string, password: string): Promise<UserResponse> => {
  const { data } = await axios.post<UserResponse>(`${API_URL}/login`, { email, password });
  return data;
};

export const registerUser = async (name: string, email: string, password: string, role: 'student' | 'organizer'): Promise<UserResponse> => {
  const { data } = await axios.post<UserResponse>(`${API_URL}/register`, { name, email, password, role });
  return data;
};

// For student profile
interface StudentProfileResponse {
  _id: string;
  name: string;
  email: string;
  role: 'student';
  registeredEvents: Array<{
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    isCompleted: boolean;
  }>;
  upcomingEvents: Array<any>; // Define proper types if needed
  completedEvents: Array<any>; // Define proper types if needed
}

export const getProfile = async (): Promise<StudentProfileResponse> => {
  // Axios automatically includes the token if set in defaults by AuthContext
  const { data } = await axios.get<StudentProfileResponse>(`${API_URL}/profile`);
  return data;
};