import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
import axios from "axios";

const images = [
  "https://images.livemint.com/img/2020/02/23/1600x900/345559042_0-6_1573070266252_1582478493859.jpg",
  "https://utsav.gov.in/public/festival_top/1659608853.jpg",
  "https://parade.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgwOTg3ODIzNDY1NTk3/what-is-diwali-jpg.jpg",
  // Add more image URLs as needed
];

const Home = () => {
  let [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://event-managment-backend.onrender.com/events")
      .then((response) => {
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <div className="w-1/2">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          className="h-full"
        >
          {images.map((image, index) => (
            <div key={index} className="h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-cover h-full w-full"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
