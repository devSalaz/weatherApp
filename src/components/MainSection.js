import React from "react";

import "../assets/styles/mainSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper";

const MainSection = ({ currentWeather, setIsCursorHover }) => {
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
    <div className="main-container">
      <h3 className="city-name">
        {currentWeather.name}, {currentWeather.sys.country}
      </h3>
      <h3 className="degree">{Math.round(currentWeather.main.temp)}°</h3>
      <h3
        className="timing-title"
        onMouseEnter={() => setIsCursorHover(true)}
        onMouseLeave={() => setIsCursorHover(false)}
      >
        {currentWeather.weather[0].description}
      </h3>
      <div className="container-info">
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
    </div>
  );
};

export default MainSection;
