import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
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
