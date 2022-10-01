import { useState, useEffect, useRef } from "react";

import "./assets/styles/globalStyles.css";

import Navbar from "./components/Navbar";
import MainSection from "./components/MainSection";
import CustomCursor from "./components/CustomCursor";

import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cursorPos, setCursorPos] = useState([0, 0]);
  const [isCursorHover, setIsCursorHover] = useState(false);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((response) => setCurrentWeather(response))
      .catch((err) => console.error(err));
  };

  const onMouseMoveHandler = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    setCursorPos([x, y]);
  };

  useEffect(() => {}, [isDarkMode]);

  useEffect(() => {
    console.log(currentWeather);
  }, [currentWeather]);

  return (
    <div
      className={`App ${isDarkMode ? "dark" : ""}`}
      onMouseMove={(e) => onMouseMoveHandler(e)}
    >
      <CustomCursor cursorPos={cursorPos} isCursorHover={isCursorHover} />
      <Navbar
        isDarkMode={isDarkMode}
        setDarkMode={setDarkMode}
        onSearchChange={handleOnSearchChange}
        setIsCursorHover={setIsCursorHover}
      />
      {currentWeather && (
        <MainSection
          currentWeather={currentWeather}
          setIsCursorHover={setIsCursorHover}
        />
      )}
    </div>
  );
}

export default App;
