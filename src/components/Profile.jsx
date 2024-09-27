import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [editing, setEditing] = useState(false); // To toggle between edit and view mode
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [events, setEvents] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch user profile details
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setNewUsername(response.data.username);
        setNewEmail(response.data.email);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    // Fetch user's created events
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}/event`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchUser();
    fetchEvents();
  }, [userId]);

  const handleEditToggle = () => {
    setEditing(!editing); // Toggle between edit and view mode
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/user/${userId}`,
        { username: newUsername, email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser({ username: newUsername, email: newEmail });
      setEditing(false);
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_ENDPOINT}/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[90vh]">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* Profile Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Profile Details</h3>
        {!editing ? (
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleEditToggle}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <label className="block">
              Username:
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mt-2">
              Email:
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Events List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">My Events</h3>
        {events.length > 0 ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Event Name</th>
                <th className="px-6 py-3">Edit</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id} className="border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{event.title}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-yellow-500 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleEditEvent(event._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events created yet.</p>
        )}
      </div>


    </div>
  );
};

export default Profile;
