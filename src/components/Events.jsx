import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/event/all`);
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

  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 100) {
      return words.slice(0, 100).join(' ') + '...';
    }
    return description;
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-[90vh]">
      <div className="w-full mb-8">
        
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
      className="border border-gray-300 rounded-lg p-4 bg-white transition-transform transform hover:scale-105"
    >
      <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
      <p className="text-gray-700 mt-2 text-justify">{truncateDescription(event.description)}</p>
      <p className="text-gray-500 mt-1"><span className="font-bold">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-500 mt-1"><span className="font-bold">Time:</span> {event.time}</p>
      <p className="text-gray-500 mt-1"><span className="font-bold">Location:</span> {event.location}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default Events;
