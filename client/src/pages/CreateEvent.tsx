import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    capacity: "",
    status: "upcoming" as "upcoming" | "ongoing" | "completed",
  });

  // Load event data in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      // Mock data - replace with API call
      const mockEvent = {
        id,
        title: "Tech Symposium 2024",
        category: "technology",
        date: "2024-03-15",
        time: "10:00",
        location: "Main Auditorium",
        description: "Annual technology conference",
        capacity: "100",
        status: "upcoming" as const,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
      };
      setFormData(mockEvent);
      setImagePreviews([mockEvent.image]);
    }
  }, [id, isEditMode]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setImagePreviews([...imagePreviews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.date || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success(isEditMode ? "Event updated successfully!" : "Event created successfully!");
    setTimeout(() => navigate("/organizer"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 container mx-auto px-4 py-12">
        <Link to="/organizer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isEditMode ? "Edit Event" : "Create New Event"}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Update your event details" : "Fill in the details to create an amazing event"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>All fields marked with * are required</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Images */}
                <div className="space-y-2">
                  <Label>Event Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="images"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload images or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 10MB (Multiple files allowed)
                      </p>
                    </label>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Max Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    />
                  </div>
                </div>

                {isEditMode && (
                  <div className="space-y-2">
                    <Label htmlFor="status">Event Status *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Event venue"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" className="flex-1" asChild>
                    <Link to="/organizer">Cancel</Link>
                  </Button>
                  <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
                    {isEditMode ? "Update Event" : "Create Event"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEvent;
