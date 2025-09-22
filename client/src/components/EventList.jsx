import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";

const events = [
  { 
    id: 1, 
    title: "TechFest 2025", 
    date: "2025-10-05", 
    location: "Auditorium",
    category: "Technology",
    attendees: 250,
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: 2, 
    title: "Cultural Night", 
    date: "2025-10-10", 
    location: "Main Hall",
    category: "Cultural",
    attendees: 180,
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-10-15",
    location: "Sports Ground",
    category: "Sports",
    attendees: 320,
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
];

const categoryColors = {
  Technology: "from-primary-500 to-primary-600",
  Cultural: "from-secondary-500 to-secondary-600",
  Sports: "from-accent-500 to-accent-600",
};

export default function EventList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-3 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-primary-600" />
            <span className="text-primary-700 font-semibold">Discover Amazing Events</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 animate-slide-up">
            Campus Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Join exciting events, connect with peers, and create unforgettable memories. 
            Your campus adventure starts here!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="card p-0 overflow-hidden group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/event/${event.id}`)}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${categoryColors[event.category]}`}>
                  {event.category}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-secondary-600" />
                    <span className="text-sm font-medium">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4 text-accent-600" />
                    <span className="text-sm font-medium">{event.attendees} attending</span>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="card p-12 max-w-4xl mx-auto">
            <div className="animate-float">
              <Calendar className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Ready to Join the Fun?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Don't miss out on amazing campus events. Register now and be part of something special!
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary text-lg px-8 py-4"
            >
              View My Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}