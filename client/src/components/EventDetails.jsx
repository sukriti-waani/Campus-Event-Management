import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, User, Users, ArrowLeft, Star, Share2 } from "lucide-react";

const events = [
  {
    id: 1,
    title: "TechFest 2025",
    date: "2025-10-05",
    time: "10:00 AM",
    location: "Auditorium",
    organizer: "Tech Club",
    deadline: "2025-10-03",
    desc: "Annual tech showcase with coding, robotics, and AI challenges. Join us for an exciting day of innovation and technology.",
    category: "Technology",
    attendees: 250,
    maxAttendees: 300,
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: ["Coding Competition", "AI Workshop", "Robotics Demo", "Tech Talks"],
    rating: 4.8
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "2025-10-10",
    time: "6:00 PM",
    location: "Main Hall",
    organizer: "Cultural Society",
    deadline: "2025-10-08",
    desc: "Dance, drama & music performances showcasing the rich cultural diversity of our campus community.",
    category: "Cultural",
    attendees: 180,
    maxAttendees: 200,
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: ["Dance Performances", "Drama Shows", "Music Concert", "Cultural Food"],
    rating: 4.9
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-10-15",
    time: "9:00 AM",
    location: "Sports Ground",
    organizer: "Sports Committee",
    deadline: "2025-10-12",
    desc: "Competitions in athletics, football, cricket and more. Show your sporting spirit and compete for glory!",
    category: "Sports",
    attendees: 320,
    maxAttendees: 400,
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: ["Athletics", "Football", "Cricket", "Basketball"],
    rating: 4.7
  },
];

const categoryColors = {
  Technology: "from-primary-500 to-primary-600",
  Cultural: "from-secondary-500 to-secondary-600",
  Sports: "from-accent-500 to-accent-600",
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors duration-300 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Events</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 animate-fade-in">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${categoryColors[event.category]}`}>
                {event.category}
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{event.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-5 w-5" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="card p-8 mb-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{event.desc}</p>
              
              {/* Highlights */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Event Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-primary-50 rounded-xl">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <div className="card p-6 animate-slide-up">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Event Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-gray-800">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary-100 rounded-lg">
                    <Clock className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-gray-800">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="font-semibold text-gray-800">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success-100 rounded-lg">
                    <User className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Organizer</p>
                    <p className="font-semibold text-gray-800">{event.organizer}</p>
                  </div>
                </div>
              </div>

              {/* Registration Deadline */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm text-yellow-800">
                  <strong>Registration Deadline:</strong> {event.deadline}
                </p>
              </div>
            </div>

            {/* Attendance Card */}
            <div className="card p-6 animate-slide-up">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Attendance</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Registered</span>
                  <span className="font-semibold">{event.attendees}/{event.maxAttendees}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${attendancePercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {Math.round(attendancePercentage)}% capacity filled
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 animate-slide-up">
              <button
                onClick={() => navigate(`/register/${event.title}`)}
                className="w-full btn-primary text-lg py-4"
              >
                Register Now
              </button>
              
              <button className="w-full btn-outline flex items-center justify-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Share Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}