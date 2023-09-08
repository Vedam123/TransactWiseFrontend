import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SetupsSearchForm() {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault();

    const searchPath = searchKey
      ? `/list_ui_config_data?config_key=${searchKey}`
      : "/list_ui_config_data";

    navigate(searchPath);
  };  

  return (
    <div className="child-container menu-container">
      <h2 className="title">Search and Create File</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSearch}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="searchKey">Search Key:</label>
              </div>
              <input
                type="text"
                id="searchKey"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetupsSearchForm;
