import { useState, useEffect } from "react";

import "./assets/styles/globalStyles.css";

import Navbar from "./components/Navbar";
import MainSection from "./components/MainSection";
import CustomCursor from "./components/CustomCursor";
import ThreeComponent from "./components/ThreeComponent";
import LoadingExample from "./components/loadingExample";
import { customCity } from "./utilities/CustomCityData";

import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cursorPos, setCursorPos] = useState([0, 0]);
  const [isCursorHover, setIsCursorHover] = useState(false);
  const [isThreeLoaded, setIsThreeLoaded] = useState(false);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
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

  useEffect(() => {
    handleOnSearchChange(
      customCity[Math.round(Math.random() * (customCity.length - 1))]
    );
  }, []);

  useEffect(() => {}, [isDarkMode]);

  useEffect(() => {}, [currentWeather]);

  return (
    <div
      className={`App ${isDarkMode ? "dark" : ""}`}
      onMouseMove={(e) => onMouseMoveHandler(e)}
    >
      <LoadingExample isThreeLoaded={isThreeLoaded} />
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
          isThreeLoaded={isThreeLoaded}
        />
      )}
      <ThreeComponent
        isDarkMode={isDarkMode}
        currentWeather={currentWeather}
        setIsThreeLoaded={setIsThreeLoaded}
        isThreeLoaded={isThreeLoaded}
      />
    </div>
  );
}

export default App;
