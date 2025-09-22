import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import EventDetails from "./components/EventDetails.jsx";
import EventList from "./components/EventList.jsx";
import Feedback from "./components/Feedback.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./components/Register.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/register/:eventName" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
