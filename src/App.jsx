import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateEvent from "./pages/CreateEvent";
import ShowEvent from "./pages/ShowEvent";
import EditEvent from "./pages/EditEvent";
import Navbar from "./components/Navbar";
import ListEvent from "./pages/ListEvent";

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<ListEvent />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/show/:id" element={<ShowEvent />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
