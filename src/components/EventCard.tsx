import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
  onRegister?: () => void;
}

const EventCard = ({ id, title, date, location, category, image, attendees, onRegister }: EventCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02]">
      <Link to={`/event/${id}`}>
        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-3 right-3 bg-gradient-primary border-0">
            {category}
          </Badge>
        </div>
      </Link>

      <CardHeader className="space-y-2">
        <Link to={`/event/${id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 text-primary" />
          <span>{attendees} attending</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
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
