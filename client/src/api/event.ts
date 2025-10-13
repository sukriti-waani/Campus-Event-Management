// client/src/api/event.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events'; // Ensure this matches your backend URL

// Define Event and Student interfaces based on your backend models
interface Organizer {
  _id: string;
  name: string;
  email: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  organizer: Organizer; // Populate with organizer details
  registeredStudents: string[]; // Array of student IDs initially
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  isCompleted?: boolean;
}

interface RegisteredStudent {
  _id: string;
  name: string;
  email: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  const { data } = await axios.get<Event[]>(API_URL);
  return data;
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const { data } = await axios.get<Event>(`${API_URL}/${id}`);
  return data;
};


export const createEvent = async (eventData: EventFormData): Promise<Event> => {
  // Token is automatically added by Axios default headers if user is logged in
  const { data } = await axios.post<Event>(API_URL, eventData);
  return data;
};

export const updateEvent = async (id: string, eventData: Partial<EventFormData>): Promise<Event> => {
  const { data } = await axios.put<Event>(`${API_URL}/${id}`, eventData);
  return data;
};

export const deleteEvent = async (id: string): Promise<{ message: string }> => {
  const { data } = await axios.delete<{ message: string }>(`${API_URL}/${id}`);
  return data;
};

export const registerForEvent = async (id: string): Promise<{ message: string }> => {
  const { data } = await axios.post<{ message: string }>(`${API_URL}/${id}/register`, {});
  return data;
};

export const getEventRegistrations = async (id: string): Promise<RegisteredStudent[]> => {
  const { data } = await axios.get<RegisteredStudent[]>(`${API_URL}/${id}/registrations`);
  return data;
};