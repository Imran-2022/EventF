import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { eventId } = useParams(); // Get the event ID from the URL parameters
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Extract date from the ISO string and set it in the state
            const eventData = response.data;
            const formattedDate = new Date(eventData.date).toISOString().split('T')[0]; // Format to yyyy-MM-dd
            setEventDetails({
                ...eventData,
                date: formattedDate, // Set the formatted date
            });
        } catch (err) {
            console.error("Failed to fetch event details:", err);
        }
    };

    fetchEventDetails();
}, [eventId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/event/${eventId}`,
        eventDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/"); // Redirect after successful update
    } catch (err) {
      setError("Failed to update event. Please check the details.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex min-h-[90vh]">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={eventDetails.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={eventDetails.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={eventDetails.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
