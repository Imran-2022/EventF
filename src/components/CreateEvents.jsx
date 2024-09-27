import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvents = () => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/event`, // Update with your backend URL
        { ...eventDetails, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 201) {
        navigate("/"); // Redirect after successful creation
      }
    } catch (err) {
      setError("Failed to create event. Please check the details.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex min-h-[90vh]">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
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
          <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvents;
