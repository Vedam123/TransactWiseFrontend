import React, { useState, useEffect, Suspense } from "react";
import { IS_INAPP_HELP_NEEDED } from "../admin/setups/ConstDecl"; // Import your constants
import logger from "./Logs/logger";
import "../utilities/css/appcss.css";

const imagePaths = [
  require("./images/lake-am.jpg"),
  require("./images/Red River Grass.png"),
  require("./images/Red River1.png"),
  // Add more image paths here
];

export default function DocumentationContainer(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [resolvedComponents, setResolvedComponents] = useState([]);

  useEffect(() => {
    logger.info(
      `[${new Date().toLocaleTimeString()}] DocumentationContainer is rendered`
    );

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 30000); // 30 seconds in milliseconds

    return () => {
      logger.info(
        `[${new Date().toLocaleTimeString()}] DocumentationContainer is unmounted`
      );
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (props.componentNames && Array.isArray(props.componentNames) && IS_INAPP_HELP_NEEDED) {
      const dynamicComponentPromises = [];

      props.componentNames.forEach((componentName) => {
        // Add "HELP_" prefix to the componentName
        const docComponentName = `HELP_${componentName}`;

        // Log the import path for debugging
        console.log(`Attempting to import: ../../inapp-help/display/${docComponentName}.js`);

        dynamicComponentPromises.push(
          import(`../../inapp-help/display/${docComponentName}.js`)
            .then((module) => module.default)
            .catch((error) => {
              console.error(`Failed to import ${docComponentName}:`, error);
              return null;
            })
        );
      });

      // Render dynamic components within Suspense after they have all resolved
      Promise.all(dynamicComponentPromises).then((resolvedComponents) => {
        setResolvedComponents(resolvedComponents);
      });
    }
  }, [props.componentNames]);

  const backgroundImageStyle = {
    backgroundImage:
      currentImageIndex !== undefined
        ? `url(${imagePaths[currentImageIndex]?.default})`
        : "none",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    opacity: 0.8,
  };

  return (
    <div className={`child-container empty-container ${IS_INAPP_HELP_NEEDED ? 'help-enabled' : 'help-disabled'}`} style={backgroundImageStyle}>
      <div className="documentation-content">
        {IS_INAPP_HELP_NEEDED ? (
          <Suspense fallback={<div>Loading...</div>}>
            {resolvedComponents.map((DynamicComponent, index) =>
              DynamicComponent ? <DynamicComponent key={index} /> : null
            )}
          </Suspense>
        ) : (
          <p className="no-help-text-message">Help text is not enabled.</p>
        )}
      </div>
    </div>
  );
}
