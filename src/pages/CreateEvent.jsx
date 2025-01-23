import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import EventCard from "../components/EventCard";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!datetime) newErrors.datetime = "Date and Time are required";
    if (!venue) newErrors.venue = "Venue is required";
    if (!image) newErrors.image = "Image URL is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const event = {
      title,
      description,
      date: datetime,
      venue,
      image,
    };
    axios
      .post("https://event-managment-backed.onrender.com/events", event)
      .then((response) => {
        enqueueSnackbar("Event created successfully", { variant: "success" });
        navigate("/events");
      })
      .catch((error) => {
        enqueueSnackbar("Error creating event", { variant: "error" });
        console.error("Error creating event: ", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create Event</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="flex flex-col border-2 border-gray-500 rounded-xl w-full max-w-lg p-4 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label htmlFor="title" className="text-xl mr-4 text-gray-500">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded-2xl"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="my-4">
              <label
                htmlFor="description"
                className="text-xl mr-4 text-gray-500"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded-2xl"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="my-4">
              <label htmlFor="datetime" className="text-xl mr-4 text-gray-500">
                Date and Time
              </label>
              <input
                type="datetime-local"
                id="datetime"
                value={datetime}
                onChange={(event) => setDatetime(event.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded-2xl"
              />
              {errors.datetime && (
                <p className="text-red-500 text-sm mt-1">{errors.datetime}</p>
              )}
            </div>
            <div className="my-4">
              <label htmlFor="venue" className="text-xl mr-4 text-gray-500">
                Venue
              </label>
              <input
                type="text"
                id="venue"
                value={venue}
                onChange={(event) => setVenue(event.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded-2xl"
              />
              {errors.venue && (
                <p className="text-red-500 text-sm mt-1">{errors.venue}</p>
              )}
            </div>
            <div className="my-4">
              <label htmlFor="image" className="text-xl mr-4 text-gray-500">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded-2xl"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>
            <button
              type="submit"
              className="p-2 bg-gray-800 text-white rounded-2xl w-full"
            >
              Create Event
            </button>
          </form>
        </div>
        {(title || description || datetime || venue || image) && (
          <div className="mt-8 lg:mt-0">
            <h2 className="text-2xl mb-4">Event Preview</h2>
            <EventCard
              event={{
                title,
                description,
                date: datetime,
                venue,
                image,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
