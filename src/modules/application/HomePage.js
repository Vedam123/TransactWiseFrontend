import React, { useEffect } from "react";
import "../utilities/css/appcss.css";
import HomePageMenu from "./menus/HomePageMenu";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";
import { APPLICATION_NAME, APPLICATION_LEVEL } from "../admin/setups/ConstDecl";
import logger from "../utilities/Logs/logger"; // Use default import

export default function HomePage() {
  useEffect(() => {
    // Log a message when the component mounts
    logger.info(`[${new Date().toLocaleTimeString()}] HomePage component has mounted (Environment: ${APPLICATION_LEVEL}).`);

    // You can also log additional information as needed
    logger.debug(`[${new Date().toLocaleTimeString()}] Debug message for component mount.`);
    
    // Cleanup function: Log a message when the component unmounts
    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] HomePage component is unmounting.`);
    };
  }, []);

  return (
    <div className="page-container">
      <h1 className="title">{APPLICATION_NAME}</h1>

      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Modules" color="#FFD799">
            <HomePageMenu />
            <RotatingImage />
          </DisplayCard>
        </div>

        <DocumentationContainer />
      </div>
      <BottomContainer />
    </div>
  );
}
