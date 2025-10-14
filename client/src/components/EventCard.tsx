import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  category?: string;
  image?: string;
  description?: string;
  attendees?: number;
  onRegister?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  time,
  location,
  category = "General",
  image,
  description,
  attendees = 0,
  onRegister,
}) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] rounded-2xl">
      {/* Image + Category Badge */}
      <Link to={`/event/${id}`}>
        <div className="relative overflow-hidden h-56">
          <img
            src={image || "https://via.placeholder.com/400x200?text=Event+Image"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-500 border-0 text-white shadow-md">
            {category}
          </Badge>
        </div>
      </Link>

      {/* Header */}
      <CardHeader className="space-y-1">
        <Link to={`/event/${id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
        {time && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{time}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span>{attendees} attending</span>
        </div>

        {/* Optional Description Snippet */}
        {description && (
          <p className="text-gray-600 text-xs line-clamp-2 mt-2">
            {description.substring(0, 100)}...
          </p>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white"
          onClick={(e) => {
            e.preventDefault();
            onRegister?.();
          }}
        >
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
