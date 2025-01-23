import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// filepath: /c:/Users/kaust/OneDrive/Documents/Coding Courses/SangamProj2/frontend/src/components/EventCard.jsx
const EventCard = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(event.date);
      const now = new Date();
      const difference = eventDate - now;

      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    const updateTimer = () => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(
        `${timeLeft.days || 0}d ${timeLeft.hours || 0}h ${
          timeLeft.minutes || 0
        }m ${timeLeft.seconds || 0}s`
      );
    };

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [event.date]);

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg m-4 transform transition duration-300 sm:hover:scale-105 sm:hover:shadow-xl">
      {event.image && (
        <img
          className="w-full h-48 object-cover"
          src={event.image}
          alt={event.title}
        />
      )}
      <div className="px-4 py-4 h-48">
        <div className="font-bold text-lg mb-2">{event.title}</div>
        <p className="text-gray-700 text-sm mb-2">{event.description}</p>
        <p className="text-gray-500 text-sm mb-1 my-6">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">{event.venue}</p>
      </div>
      <div className="px-4 py-4">
        <Link
          to={`/events/show/${event._id}`}
          className="bg-black text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          View
        </Link>
        <Link
          to={`/events/edit/${event._id}`}
          className="ml-2 px-3 py-2 rounded-md text-sm font-medium border border-black hover:bg-black hover:text-white transform transition duration-300 hover:-translate-y-1"
        >
          Edit
        </Link>
      </div>
      <div className="px-4 py-4">
        <p className="text-red-500 text-sm font-bold">Time left: {timeLeft}</p>
      </div>
    </div>
  );
};

export default EventCard;
