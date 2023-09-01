import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

function PartnerSearchForm() {
  const [searchType, setSearchType] = useState("partnerid");
  const [searchInput, setSearchInput] = useState("");
  //const history = useHistory();
  const navigate = useNavigate();

  

  const handleSearch = (e) => {
    e.preventDefault();

    const searchPath = searchInput
      ? `/partner-results/${searchType}/${searchInput}`
      : "/partner-results";
      console.log(searchPath)
    navigate(searchPath);
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Partner Search</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSearch}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="searchType">Search By:</label>
              </div>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="form-control input-field"
              >
                <option value="partnerid">Partner ID</option>
                <option value="partnername">Partner Name</option>
              </select>
            </div>
          </div>
  
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="searchInput">Search Input:</label>
              </div>
              <input
                type="text"
                id="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
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

export default PartnerSearchForm;
