import React, { useState, useEffect } from "react";

const imagePaths = [
  require("./images/lake-am.jpg"),
  require("./images/Red River Grass.png"),
  require("./images/Red River1.png"),
  // Add more image paths here
];

export default function DocumentationContainer() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 30000); // 30 seconds in milliseconds

    return () => {
      clearInterval(interval);
    };
  }, []); // No dependencies

  const backgroundImageStyle = {
    backgroundImage: currentImageIndex !== undefined ? `url(${imagePaths[currentImageIndex]?.default})` : "none",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    opacity: 0.8,
  };

  return (
    <div className="child-container empty-container" style={backgroundImageStyle}>
      <div className="empty-text">
        This space is reserved to update documentation
      </div>
    </div>
  );
}
