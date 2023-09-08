import React, { useEffect } from "react";
import axios from "axios";

const ConfigFileGenerator = () => {
  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const response = await axios.get("http://localhost:8010/list_ui_config_data");
        generateConfigFile(response.data);
      } catch (error) {
        console.error("Error fetching config data:", error);
      }
    };

    fetchConfigData();
  }, []);

  const generateConfigFile = (data) => {
    const configContent = data.reduce((content, item) => {
      return `${content}export const ${item.config_key} = "${item.config_value}";\n`;
    }, "");

    const fileName = "ConstDecl10.js"; // File name

    const blob = new Blob([configContent], { type: "text/javascript" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
  };

  return <div>Generating Config File...</div>;
};

export default ConfigFileGenerator;
