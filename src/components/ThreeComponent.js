import React from "react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import "../assets/styles/threeComponent.css";

import MainScene from "../components/MainScene";

const ThreeComponent = ({
  isDarkMode,
  currentWeather,
  setIsThreeLoaded,
  isThreeLoaded,
}) => {
  const refContainer = useRef(null);
  useEffect(() => {
    MainScene.init(refContainer.current, setIsThreeLoaded);
  }, []);

  useEffect(() => {
    MainScene.onDarkModeChanged(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    MainScene.onWeatherChanged(currentWeather);
  }, [currentWeather]);

  return (
    <motion.div
      animate={{ filter: isThreeLoaded ? "blur(0px)" : "blur(4px)" }}
      initial={{ filter: "blur(4px)" }}
      transition={{ duration: 1, delay: 0.75 }}
      ref={refContainer}
      className="canvas-container"
    ></motion.div>
  );
};

export default ThreeComponent;
