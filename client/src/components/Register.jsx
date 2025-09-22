import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Mail, Calendar, CheckCircle, ArrowLeft } from "lucide-react";

export default function Register() {
  const { eventName } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
      registrations.push({ name, email, event: eventName, date: new Date().toISOString() });
      localStorage.setItem("registrations", JSON.stringify(registrations));
      setIsSubmitting(false);
      navigate("/dashboard", { state: { showSuccess: true, eventName } });
    }, 1500);
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors duration-300 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back</span>
        </button>

        <div className="card p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl mb-4 animate-bounce-gentle">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Event Registration</h1>
            <p className="text-gray-600">Join us for an amazing experience!</p>
          </div>

          {/* Event Info */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Registering for:</h2>
            <p className="text-2xl font-bold gradient-text">{eventName}</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-slide-up">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email / Roll Number *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your email or roll number"
                />
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Name
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={eventName}
                  readOnly
                  className="input-field pl-12 bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Registration Terms</p>
                  <p>By registering, you agree to attend the event and follow all campus guidelines. Cancellation must be done 24 hours before the event.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "btn-primary"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Registering...</span>
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-8 text-center text-sm text-gray-500 animate-fade-in">
            <p>Need help? Contact the event organizers or visit the help desk.</p>
          </div>
        </div>
      </div>
    </div>
  );
}