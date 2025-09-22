import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, User, Mail, Trash2, CheckCircle, Clock, MapPin } from "lucide-react";

export default function Dashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(stored);

    // Show success message if coming from registration
    if (location.state?.showSuccess) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [location]);

  const handleRemoveRegistration = (index) => {
    const updated = registrations.filter((_, i) => i !== index);
    setRegistrations(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  const getEventStatus = (eventName) => {
    const eventDates = {
      "TechFest 2025": "2025-10-05",
      "Cultural Night": "2025-10-10",
      "Sports Meet": "2025-10-15"
    };
    
    const eventDate = new Date(eventDates[eventName]);
    const today = new Date();
    
    if (eventDate > today) {
      return { status: "upcoming", color: "text-blue-600 bg-blue-100", icon: Clock };
    } else {
      return { status: "completed", color: "text-green-600 bg-green-100", icon: CheckCircle };
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 animate-slide-up">
            <div className="bg-success-50 border border-success-200 rounded-xl p-4 flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-success-600" />
              <div>
                <p className="font-semibold text-success-800">Registration Successful!</p>
                <p className="text-success-700">You've been registered for {location.state?.eventName}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl mb-4 animate-bounce-gentle">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Your Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your event registrations and stay updated</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 text-center animate-slide-up">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{registrations.length}</h3>
            <p className="text-gray-600">Total Registrations</p>
          </div>
          
          <div className="card p-6 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {registrations.filter(r => getEventStatus(r.event).status === 'upcoming').length}
            </h3>
            <p className="text-gray-600">Upcoming Events</p>
          </div>
          
          <div className="card p-6 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {registrations.filter(r => getEventStatus(r.event).status === 'completed').length}
            </h3>
            <p className="text-gray-600">Completed Events</p>
          </div>
        </div>

        {/* Registrations List */}
        <div className="card p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Registered Events</h2>
          
          {registrations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Registered</h3>
              <p className="text-gray-500 mb-6">You haven't registered for any events yet.</p>
              <button
                onClick={() => window.location.href = '/'}
                className="btn-primary"
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.map((registration, index) => {
                const eventStatus = getEventStatus(registration.event);
                const StatusIcon = eventStatus.icon;
                
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{registration.event}</h3>
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${eventStatus.color}`}>
                          <StatusIcon className="h-4 w-4" />
                          <span className="capitalize">{eventStatus.status}</span>
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-primary-600" />
                          <span><strong>Name:</strong> {registration.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-secondary-600" />
                          <span><strong>Email:</strong> {registration.email}</span>
                        </div>
                        {registration.date && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-accent-600" />
                            <span><strong>Registered:</strong> {new Date(registration.date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <button
                        onClick={() => handleRemoveRegistration(index)}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-300 group"
                      >
                        <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium">Cancel</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}