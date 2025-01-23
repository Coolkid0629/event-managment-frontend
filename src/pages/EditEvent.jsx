import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import EventCard from "../components/EventCard";
import ConfirmDialog from "../components/ConfirmDialog";

// filepath: /c:/Users/kaust/OneDrive/Documents/Coding Courses/SangamProj2/frontend/src/pages/EditEvent.jsx
const EditEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://event-managment-backed.onrender.com/events/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDatetime(res.data.date);
        setVenue(res.data.venue);
        setImage(res.data.image);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = {
      title,
      description,
      date: datetime,
      venue,
      image,
    };
    axios
      .put(`https://event-managment-backed.onrender.com/events/${id}`, event)
      .then((response) => {
        enqueueSnackbar("Event updated successfully", { variant: "success" });
        navigate(`/events/show/${id}`);
      })
      .catch((error) => {
        enqueueSnackbar("Error updating event", { variant: "error" });
        console.error("Error updating event: ", error);
      });
  };

  const handleDelete = async () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    axios
      .delete(`https://event-managment-backed.onrender.com/events/${id}`)
      .then((response) => {
        enqueueSnackbar("Event deleted successfully", { variant: "success" });
        navigate("/events");
      })
      .catch((error) => {
        enqueueSnackbar("Error deleting event", { variant: "error" });
        console.error("Error deleting event: ", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Event</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
        <div className="flex flex-col border-2 border-gray-500 rounded-xl w-full max-w-lg p-4 mx-auto lg:mx-5">
          <h2 className="text-2xl mb-4">Actions</h2>
          <button
            className="p-2 bg-red-600 text-white rounded-2xl text-center"
            onClick={handleDelete}
          >
            Delete Event
          </button>
        </div>
        <div className="flex flex-col border-2 border-gray-500 rounded-xl w-full max-w-lg p-4 mx-auto lg:mx-0">
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
            </div>
            <button
              type="submit"
              className="p-2 bg-gray-800 text-white rounded-2xl w-full"
            >
              Update Event
            </button>
          </form>
        </div>
        <div className="flex flex-col border-2 border-gray-500 rounded-xl w-full max-w-lg p-4 mx-auto lg:mx-0">
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
      </div>
      <ConfirmDialog
        show={showConfirm}
        message="Are you sure you want to delete this event?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default EditEvent;
