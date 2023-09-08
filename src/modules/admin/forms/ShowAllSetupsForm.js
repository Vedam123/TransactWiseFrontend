import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../utilities/css/appcss.css";
import ConfigFileGenerator from "../ConfigFileGenerator";
import { API_URL } from "../setups/ConstDecl";

function ShowAllSetupsForm() {
  const [configData, setConfigData] = useState([]);
  const [error, setError] = useState(null);
  const [isGeneratingFile, setIsGeneratingFile] = useState(false);
  const [useApiUrlFromFile, setUseApiUrlFromFile] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [generationMessage, setGenerationMessage] = useState(""); // Added a state for generation message

  useEffect(() => {
    const fetchData = async () => {
      try {
        let finalApiUrl = useApiUrlFromFile
          ? `${API_URL}/list_ui_config_data`
          : `${apiUrl}/list_ui_config_data`;

        // alert(finalApiUrl);

        const response = await axios.get(finalApiUrl);
        setConfigData(response.data);
        setError(null);
        setGenerationMessage(""); // Clear the generation message when data is fetched
      } catch (error) {
        console.error("Error fetching config data:", error);
        setError("An error occurred while fetching data.");
      }
    };

    if (useApiUrlFromFile || apiUrl) {
      fetchData();
    }
  }, [apiUrl, useApiUrlFromFile]);

  const handleGenerateFile = async () => {
    if (useApiUrlFromFile) {
      setIsGeneratingFile(true);
      setGenerationMessage("Generating File...");
      // Perform any file generation logic with API_URL
      // Simulate file generation with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsGeneratingFile(false);
      setGenerationMessage("File Generated!");
    } else if (apiUrl) {
      setIsGeneratingFile(true);
      setGenerationMessage("Generating File...");
      // Perform any file generation logic with apiUrl
      // Simulate file generation with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsGeneratingFile(false);
      setGenerationMessage("File Generated!");
    } else {
      setError(""); // Clear error message when generating the file
    }
  };

  const handleApiUrlChange = (event) => {
    setApiUrl(event.target.value);
    setUseApiUrlFromFile(false); // Disable the checkbox when input is entered
    setConfigData([]); // Clear the table data
  };

  const handleUseApiUrlFromFileChange = (event) => {
    setUseApiUrlFromFile(event.target.checked);
    setApiUrl(""); // Clear the input field when checkbox is selected
    setConfigData([]); // Clear the table data
  };

  return (
    <div className="child-container menu-container">
      <h2>Configurations from DB and File Generation</h2>
      <div className="child-container form-container">
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <label htmlFor="serverUrl" className="label-container">
              Server URL:
            </label>
            <input
              type="text"
              id="serverUrl"
              placeholder="Enter API URL"
              value={apiUrl}
              onChange={handleApiUrlChange}
              className="form-control input-field"
              disabled={useApiUrlFromFile} // Disable input when checkbox is selected
            />
          </div>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="ignoreUrlEntry"
            checked={useApiUrlFromFile}
            onChange={handleUseApiUrlFromFileChange}
            className="form-check-input"
            disabled={!!apiUrl} // Disable checkbox when input has value
          />
          <label htmlFor="ignoreUrlEntry" className="form-check-label">
            Ignore URL Entry
          </label>
        </div>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            {configData.length > 0 && (
              <table className="striped-table">
                <thead>
                  <tr className="table-header">
                    <th>Config Key</th>
                    <th>Config Value</th>
                  </tr>
                </thead>
                <tbody>
                  {configData.map((config) => (
                    <tr key={config.config_key}>
                      <td>{config.config_key}</td>
                      <td>{config.config_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button
              onClick={handleGenerateFile}
              className="btn btn-primary"
              disabled={isGeneratingFile}
            >
              {isGeneratingFile ? "Generating File..." : "Generate File"}
            </button>
            <p>{generationMessage}</p>
            {isGeneratingFile && <ConfigFileGenerator />}
          </>
        )}
      </div>
    </div>
  );
}

export default ShowAllSetupsForm;
