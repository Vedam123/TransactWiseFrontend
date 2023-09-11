import React, { useEffect } from "react";
import axios from "axios";

const ConfigFileGenerator = ({ apiUrl }) => {
  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log("The API URL sent as parameter to ConfigFileGenerator", apiUrl);
        console.log("The Response data", response.data);

        const generateConfigFile = (data, apiURL) => {
          const configContent = data.reduce((content, item) => {
            return `${content}export const ${item.config_key} = "${item.config_value}";\n`;
          }, "");

          const comment = "// Data generated from the apiUrl "+ apiUrl;
          console.log("Console log of API url vdamx ",apiUrl);
          const fileName = "ConstDecl.js"; // File name

          const blob = new Blob([comment, "\n", configContent], { type: "text/javascript" });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;

          document.body.appendChild(link);
          link.click();

          window.URL.revokeObjectURL(url);
        };

        generateConfigFile(response.data, apiUrl);
      } catch (error) {
        console.error("Error fetching config data:", error);
      }
    };

    fetchConfigData();
  }, [apiUrl]);

  return <div>Generating Config File...</div>;
};

export default ConfigFileGenerator;
