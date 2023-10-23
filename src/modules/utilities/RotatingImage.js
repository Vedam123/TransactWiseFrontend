import React, { useState, useEffect } from "react";
import logger from "../utilities/Logs/logger"; // Import your logger module here
import amethystImage from "./images/amethyst-purple.JPG";

export default function RotatingImage() {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] RotatingImage is rendered.`);
    
    const rotateImage = () => {
      setRotationAngle((prevAngle) => prevAngle + 1); // Increment the rotation angle by 1 degree
    };

    const rotationInterval = setInterval(rotateImage, 10); // Rotate the image every 10 milliseconds

    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] RotatingImage is unmounted.`);
      clearInterval(rotationInterval); // Clear the interval when the component is unmounted
    };
  }, []);

  return (
    <div className="rotating-image">
      <img
        src={amethystImage}
        alt="Rotating"
        style={{
          transform: `rotate(${rotationAngle}deg)`,
          width: "20%",
          height: "auto",
        }}
      />
    </div>
  );
}
