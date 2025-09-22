import { useState } from "react";
import { MessageSquare, Star, Send, CheckCircle } from "lucide-react";

export default function Feedback() {
  const [eventName, setEventName] = useState("");
  const [rating, setRating] = useState(5);
  const [suggestions, setSuggestions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setEventName("");
        setRating(5);
        setSuggestions("");
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  }

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 transition-all duration-300 hover:scale-110 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <Star className={`h-8 w-8 ${star <= rating ? 'fill-current' : ''}`} />
          </button>
        ))}
        <span className="ml-3 text-lg font-semibold text-gray-700">
          {rating} star{rating !== 1 ? 's' : ''}
        </span>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-fade-in">
          <div className="card p-8">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <CheckCircle className="h-8 w-8 text-success-600" />
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted successfully. We appreciate your input and will use it to improve future events.
            </p>
            <div className="flex items-center justify-center space-x-2 text-success-600">
              <div className="w-2 h-2 bg-success-600 rounded-full animate-pulse"></div>
              <span className="text-sm">Redirecting...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl mb-4 animate-bounce-gentle">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Submit Feedback</h1>
          <p className="text-xl text-gray-600">Help us improve by sharing your experience</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Name */}
            <div className="animate-slide-up">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Which event are you providing feedback for? *
              </label>
              <select
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="input-field text-lg"
              >
                <option value="">Select an event</option>
                <option value="TechFest 2025">TechFest 2025</option>
                <option value="Cultural Night">Cultural Night</option>
                <option value="Sports Meet">Sports Meet</option>
              </select>
            </div>

            {/* Rating */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                How would you rate this event? *
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <StarRating rating={rating} onRatingChange={setRating} />
                <div className="mt-4 sm:mt-0 text-right">
                  <p className="text-sm text-gray-600">
                    {rating === 5 && "Excellent! 🎉"}
                    {rating === 4 && "Very Good! 👍"}
                    {rating === 3 && "Good 👌"}
                    {rating === 2 && "Fair 😐"}
                    {rating === 1 && "Needs Improvement 😔"}
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Your suggestions and comments
              </label>
              <textarea
                rows="6"
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="input-field resize-none"
                placeholder="Tell us what you liked, what could be improved, or any other feedback you'd like to share..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Your feedback helps us create better events for everyone!
              </p>
            </div>

            {/* Submit Button */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "btn-primary"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200 animate-fade-in">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Your feedback is anonymous and helps us improve future events. 
              Be honest and specific in your comments for the best results!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}