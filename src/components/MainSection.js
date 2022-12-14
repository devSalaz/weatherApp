import React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

import "../assets/styles/mainSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { displayCurrentWeatherIcon } from "./ShowRandomMessage";

import { Autoplay } from "swiper";

const MainSection = ({ currentWeather, setIsCursorHover, isThreeLoaded }) => {
  const randomMessageRef = useRef();
  const constraintsRef = useRef();
  const getLocalTime = (timezone, dt) => {
    const dateTime = new Date(dt * 1000);
    const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
    const currentLocalTime = toUtc + 1000 * timezone;
    const selectedDate = new Date(currentLocalTime);

    const hour = selectedDate.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return hour;
  };

  return (
    <motion.div
      animate={{ opacity: isThreeLoaded ? 1 : 0 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 1 }}
      className="main-container"
    >
      <h3 className="city-name">
        {currentWeather.name}, {currentWeather.sys.country}
      </h3>
      <motion.h3
        ref={constraintsRef}
        drag
        dragConstraints={constraintsRef}
        className="degree"
        onMouseEnter={() => {
          setIsCursorHover(true);
        }}
        onMouseLeave={() => {
          setIsCursorHover(false);
        }}
      >
        {Math.round(currentWeather.main.temp)}°
      </motion.h3>
      <div className="timing-title-container">
        <div className="timing-random-message" ref={randomMessageRef}>
          {displayCurrentWeatherIcon(currentWeather.weather[0].icon)}
        </div>
        <h3
          className="timing-title"
          onMouseEnter={() => {
            setIsCursorHover(true);
            randomMessageRef.current.classList.add("show");
          }}
          onMouseLeave={() => {
            setIsCursorHover(false);
            randomMessageRef.current.classList.remove("show");
          }}
        >
          {currentWeather.weather[0].description}
        </h3>
      </div>

      <div className="container-info">
        <div className="blur-container"></div>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="container-extra-data">
              <h3>{currentWeather.main.humidity}%</h3>
              <h5>Humidity</h5>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container-extra-data">
              <h3>{currentWeather.wind.speed} KM/H</h3>
              <h5>Wind Speed</h5>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container-extra-data">
              <h3>{Math.round(currentWeather.main.feels_like)}°</h3>
              <h5>Feels Like</h5>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container-extra-data">
              <h3>{currentWeather.main.pressure}</h3>
              <h5>Pressure</h5>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container-extra-data">
              <h3>{currentWeather.wind.deg}</h3>
              <h5>Wind Deg</h5>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="container-extra-data">
              <h3>
                {getLocalTime(currentWeather.timezone, currentWeather.dt)}
              </h3>
              <h5>Local Time</h5>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </motion.div>
  );
};

export default MainSection;
