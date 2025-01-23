import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// filepath: /c:/Users/kaust/OneDrive/Documents/Coding Courses/SangamProj2/frontend/src/pages/ShowEvent.jsx
const ShowEvent = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://event-managment-backed.onrender.com/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {event.image && (
          <img
            className="w-full h-128 object-cover" // Increased height
            src={event.image}
            alt={event.title}
          />
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-700 text-base mb-4">{event.description}</p>
          <p className="text-gray-500 text-sm mb-2">
            <strong>Date:</strong> {new Date(event.date).toString()}
          </p>
          <p className="text-gray-500 text-sm mb-4">
            <strong>Venue:</strong> {event.venue}
          </p>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
            Book
          </button>
          <Link
            to={`/events/edit/${event._id}`}
            className="ml-2 px-3 py-2 rounded-md text-sm font-medium border border-black hover:bg-black hover:text-white transform transition duration-300 hover:-translate-y-1"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
