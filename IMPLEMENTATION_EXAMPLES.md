# Implementation Examples & Code Patterns

This document provides code examples demonstrating the new features and patterns implemented in the Campus Event Management system.

## 1. Using Reusable Components

### Button Component
```jsx
import { Button } from './components/ui';

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Submit
</Button>

// Outline button with loading state
<Button variant="outline" size="lg" disabled={loading}>
  {loading ? 'Processing...' : 'Continue'}
</Button>

// Danger button
<Button variant="danger" onClick={handleDelete}>
  Delete Event
</Button>
```

### Input Component
```jsx
import { Input } from './components/ui';
import { Mail } from 'lucide-react';

<Input
  label="Email Address"
  type="email"
  icon={Mail}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
  placeholder="Enter your email"
/>
```

### Card Component
```jsx
import { Card, CardHeader, CardBody, CardFooter } from './components/ui';

<Card hover>
  <CardHeader>
    <h3>Event Title</h3>
  </CardHeader>
  <CardBody>
    <p>Event description goes here...</p>
  </CardBody>
  <CardFooter>
    <Button>Register Now</Button>
  </CardFooter>
</Card>
```

### SearchBar Component
```jsx
import { SearchBar } from './components/ui';

<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search events..."
  className="w-full md:w-96"
/>
```

### Modal Component
```jsx
import { Modal } from './components/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Registration"
  size="md"
>
  <p>Are you sure you want to register for this event?</p>
  <div className="flex gap-2 mt-4">
    <Button onClick={handleConfirm}>Confirm</Button>
    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
  </div>
</Modal>
```

## 2. Using Context Providers

### Authentication Context
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, profile, loading, signIn, signOut } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {profile?.full_name}!</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### Theme Context
```jsx
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
```

### Toast Context
```jsx
import { useToast } from '../contexts/ToastContext';

function MyForm() {
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm();
      showToast('Form submitted successfully!', 'success');
    } catch (error) {
      showToast('Failed to submit form', 'error');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 3. Protected Routes

### Basic Protected Route
```jsx
import { ProtectedRoute } from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Organizer-Only Route
```jsx
<Route
  path="/organizer-dashboard"
  element={
    <ProtectedRoute requireOrganizer>
      <OrganizerDashboard />
    </ProtectedRoute>
  }
/>
```

## 4. Form Validation Pattern

### Example: Login Form with Validation
```jsx
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};

  if (!email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is invalid';
  }

  if (!password) {
    newErrors.password = 'Password is required';
  } else if (password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Submit form...
};

return (
  <form onSubmit={handleSubmit}>
    <Input
      label="Email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        // Clear error when user starts typing
        if (errors.email) setErrors({ ...errors, email: '' });
      }}
      error={errors.email}
    />
  </form>
);
```

## 5. Search and Filter Pattern

### Event List with Search & Filter
```jsx
import { useState, useMemo } from 'react';

const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');

const filteredEvents = useMemo(() => {
  return events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}, [searchQuery, selectedCategory, events]);

return (
  <div>
    <SearchBar value={searchQuery} onChange={setSearchQuery} />

    <div>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={selectedCategory === category ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>

    <div>
      {filteredEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </div>
);
```

## 6. Loading States Pattern

### Skeleton Loading
```jsx
import { EventCardSkeleton } from './components/ui/Skeleton';

function EventList() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

### Button Loading State
```jsx
const [isSubmitting, setIsSubmitting] = useState(false);

<Button disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Spinner className="mr-2" />
      Submitting...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

## 7. Accessibility Patterns

### Semantic HTML
```jsx
// Good: Semantic elements
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Event Title</h1>
    <p>Event description...</p>
  </article>
</main>

// Bad: Generic divs
<div className="nav">
  <div><a href="/">Home</a></div>
</div>
```

### ARIA Labels
```jsx
// Icon-only button
<button
  onClick={handleClose}
  aria-label="Close modal"
>
  <X className="h-5 w-5" aria-hidden="true" />
</button>

// Toggle button
<button
  onClick={toggleTheme}
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  aria-pressed={isDark}
>
  {isDark ? <Sun /> : <Moon />}
</button>
```

### Form Accessibility
```jsx
<div>
  <label htmlFor="email">
    Email Address <span aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={handleChange}
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
    required
  />
  {errors.email && (
    <p id="email-error" role="alert" className="error">
      {errors.email}
    </p>
  )}
</div>
```

### Keyboard Navigation
```jsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</div>
```

## 8. Dark Mode Implementation

### Tailwind Classes
```jsx
// Background colors
<div className="bg-white dark:bg-gray-800">
  Content
</div>

// Text colors
<p className="text-gray-900 dark:text-gray-100">
  This text adapts to theme
</p>

// Borders
<div className="border border-gray-300 dark:border-gray-600">
  Bordered content
</div>

// Hover states
<button className="hover:bg-gray-100 dark:hover:bg-gray-700">
  Hover me
</button>
```

### CSS Custom Properties
```css
/* global.css */
.dark body {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #f1f1f1;
}

/* Component-specific dark mode */
.card {
  background: var(--card-bg);
}

:root {
  --card-bg: #ffffff;
}

.dark {
  --card-bg: #1f2937;
}
```

## 9. Responsive Design Patterns

### Mobile-First Breakpoints
```jsx
// Tailwind utility classes
<div className="
  grid
  grid-cols-1        // Mobile: 1 column
  md:grid-cols-2     // Tablet: 2 columns
  lg:grid-cols-3     // Desktop: 3 columns
  gap-4
">
  {items.map(item => <Card key={item.id} />)}
</div>

// Responsive padding
<div className="px-4 md:px-6 lg:px-8">
  Content
</div>

// Show/hide on different screens
<div className="hidden md:block">
  Desktop only content
</div>

<div className="block md:hidden">
  Mobile only content
</div>
```

### Mobile Navigation
```jsx
const [isOpen, setIsOpen] = useState(false);

return (
  <nav>
    {/* Desktop menu */}
    <div className="hidden md:flex">
      <NavLinks />
    </div>

    {/* Mobile hamburger */}
    <button
      className="md:hidden"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {isOpen ? <X /> : <Menu />}
    </button>

    {/* Mobile menu */}
    {isOpen && (
      <div className="md:hidden">
        <NavLinks />
      </div>
    )}
  </nav>
);
```

## 10. Animation Patterns

### CSS Animations
```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* Slide up */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}
```

### Staggered Animations
```jsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-slide-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {item.content}
  </div>
))}
```

### Transition Classes
```jsx
<button className="
  transform
  transition-all
  duration-200
  hover:scale-105
  hover:shadow-lg
">
  Hover for effect
</button>
```

## 11. Error Handling Pattern

### Try-Catch with Toast
```jsx
import { useToast } from '../contexts/ToastContext';

function MyComponent() {
  const { showToast } = useToast();

  const handleAction = async () => {
    try {
      setLoading(true);
      const result = await performAction();
      showToast('Action completed successfully!', 'success');
      return result;
    } catch (error) {
      console.error('Action failed:', error);
      showToast(error.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return <button onClick={handleAction}>Perform Action</button>;
}
```

## 12. Lazy Loading Pattern

### Route-Based Code Splitting
```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./components/Dashboard'));
const EventList = lazy(() => import('./components/EventList'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Lazy Loading
```jsx
<img
  src={event.image}
  alt={event.title}
  loading="lazy"
  className="w-full h-48 object-cover"
/>
```

## Summary

These patterns demonstrate:
- **Reusable Components**: Build once, use everywhere
- **Context Hooks**: Simple state management
- **Validation**: User-friendly error handling
- **Accessibility**: Inclusive design practices
- **Performance**: Lazy loading and optimization
- **Responsive**: Mobile-first approach
- **Dark Mode**: Theme support throughout
- **Animations**: Smooth, professional transitions

All patterns follow React best practices and modern web standards for maintainable, scalable code.
