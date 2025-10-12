import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import RegisterModal from "@/components/RegisterModal";

const Index = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock events data
  const events = [
    {
      id: "1",
      title: "Tech Symposium 2025",
      date: "March 15, 2025",
      location: "Engineering Auditorium",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      attendees: 250,
    },
    {
      id: "2",
      title: "Cultural Fest Spring Edition",
      date: "March 20, 2025",
      location: "Open Air Theatre",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
      attendees: 500,
    },
    {
      id: "3",
      title: "Annual Sports Meet",
      date: "April 5, 2025",
      location: "Main Stadium",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
      attendees: 350,
    },
    {
      id: "4",
      title: "Campus Hackathon",
      date: "March 25, 2025",
      location: "Computer Labs",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
      attendees: 120,
    },
    {
      id: "5",
      title: "Literature Symposium",
      date: "April 10, 2025",
      location: "Library Hall",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
      attendees: 80,
    },
    {
      id: "6",
      title: "Dance Workshop Series",
      date: "March 28, 2025",
      location: "Arts Building",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop",
      attendees: 60,
    },
  ];

  const handleRegister = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setIsRegisterOpen(true);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-primary py-20 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&h=900&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
          </div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-4 text-5xl font-bold animate-fade-in">
              Discover Campus Events
            </h1>
            <p className="mb-8 text-xl opacity-90 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Join exciting events, connect with peers, and create lasting memories
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
              onClick={() => setIsRegisterOpen(true)}
            >
              <Plus className="mr-2 h-5 w-5" />
              Register for Events
            </Button>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard
                  {...event}
                  onRegister={() => handleRegister(event.title)}
                />
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No events found matching your criteria</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create and manage your own campus events. Reach hundreds of students and make an impact.
            </p>
            <Button size="lg" variant="outline" asChild>
              <a href="/organizer/login">Become an Organizer</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        eventTitle={selectedEvent}
      />
    </div>
  );
};

export default Index;
