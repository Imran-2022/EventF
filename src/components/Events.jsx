import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/event/all");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search query
  const filteredEvents = events.filter(event => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(lowercasedQuery) ||
      event.location.toLowerCase().includes(lowercasedQuery)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-[90vh]">
      <div className="w-full mb-8">
        <h2 className="text-3xl font-bold text-center">All Events</h2>
        
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {events.length === 0 && !loading && (
          <p className="text-center">No events available.</p>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div
            key={event._id}
            className="shadow-lg rounded-lg p-4 bg-white transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-500 mt-1">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-500 mt-1">Time: {event.time}</p>
            <p className="text-gray-500 mt-1">Location: {event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
