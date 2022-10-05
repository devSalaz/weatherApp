import React from "react";
import { useRef, useEffect, useState } from "react";

import "../assets/styles/threeComponent.css";

import MainScene from "../components/MainScene";

const ThreeComponent = ({ isDarkMode, currentWeather, setIsCursorHover }) => {
  const refContainer = useRef(null);

  useEffect(() => {
    MainScene.init(refContainer.current);
  }, []);

  useEffect(() => {
    MainScene.onDarkModeChanged(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    console.log("Weather has changed");
    MainScene.onWeatherChanged(currentWeather);
  }, [currentWeather]);

  return <div ref={refContainer} className="canvas-container"></div>;
};

export default ThreeComponent;
