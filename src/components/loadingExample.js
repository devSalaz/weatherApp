import React from "react";

import { motion } from "framer-motion";

import "../assets/styles/loadingExample.css";

const loadingExample = ({ isThreeLoaded }) => {
  return (
    <motion.div
      className="loading-example"
      initial={{ opacity: 1 }}
      animate={{ opacity: isThreeLoaded ? 0 : 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.div
        className="loading-square"
        transition={{
          duration: isThreeLoaded ? 1 : 2,
          repeat: isThreeLoaded ? 0 : Infinity,
        }}
        animate={{
          scale: isThreeLoaded ? 100 : [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      ></motion.div>
    </motion.div>
  );
};

export default loadingExample;
