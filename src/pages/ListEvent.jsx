import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

// filepath: /c:/Users/kaust/OneDrive/Documents/Coding Courses/SangamProj2/frontend/src/pages/ListEvent.jsx
const ListEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://event-managment-backed.onrender.com/events")
      .then((response) => {
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex flex-wrap justify-center sm:justify-start -mx-4">
          {events.length === 0 ? (
            <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg m-4 transform transition duration-300">
              <div className="px-4 py-4 h-48 flex flex-col items-center justify-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <div className="font-bold text-lg mb-2">
                  No events planned yet
                </div>
              </div>
            </div>
          ) : (
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ListEvent;
