import { Calendar, Users, Zap, Shield, Sparkles, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    {
      icon: Calendar,
      title: "Effortless Event Management",
      description: "Create, edit, and manage campus events with an intuitive dashboard. Track upcoming, ongoing, and completed events all in one place."
    },
    {
      icon: Users,
      title: "Seamless Registration",
      description: "Students can easily discover and register for events. Organizers get real-time registration data and participant management."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant notifications and updates keep everyone informed about event changes, cancellations, or new opportunities."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Built with security in mind. Your event data and student information are protected with industry-standard practices."
    },
    {
      icon: Sparkles,
      title: "Beautiful Design",
      description: "Modern, responsive interface that works seamlessly on any device. A delightful experience for both organizers and attendees."
    },
    {
      icon: Globe,
      title: "Campus-wide Reach",
      description: "Promote events across your entire campus community. Increase participation and engagement with centralized event discovery."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              Revolutionizing Campus Event Management
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
              A comprehensive platform designed to help colleges and universities manage, 
              register, and promote events efficiently. Bringing organizers and students together 
              in a seamless digital experience.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Mission</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Campus life is vibrant and dynamic, filled with countless events, workshops, 
                  competitions, and cultural activities. However, managing these events and 
                  ensuring students can easily discover and participate in them has traditionally 
                  been challenging.
                </p>
                <p>
                  <span className="font-semibold text-foreground">CampusEvents</span> bridges 
                  this gap by providing a centralized platform where event organizers can 
                  effortlessly create and manage events, while students can explore opportunities 
                  that match their interests and register with just a few clicks.
                </p>
                <p>
                  We believe that every student should have easy access to campus opportunities, 
                  and every organizer should have powerful tools to create memorable experiences. 
                  That's why we built this platform - to make campus event management simple, 
                  efficient, and accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who It's For</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">For Organizers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Create and publish events in minutes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Track registrations and manage attendees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Update event details in real-time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Access comprehensive event analytics</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">For Students</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Discover events tailored to your interests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Register for events with ease</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Receive timely event updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Never miss out on campus opportunities</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Campus Events?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of organizers and thousands of students who are already 
              using CampusEvents to create unforgettable experiences.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
