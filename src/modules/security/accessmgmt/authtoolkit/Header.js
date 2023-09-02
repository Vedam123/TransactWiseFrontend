import React from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";

import RotatingImage from "../../../utilities/RotatingImage";

function Header(props) {
  function logMeOut() {
    //alert("log out callled");
    console.log("Logout user",props)
    axios({
      method: "POST",
      url: `${API_URL}/logout_user`
    })
      .then((response) => {
        //props.token();
        props.token(props.username);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <header className="page-container">
      <RotatingImage />
       {/* Display the username */}
      {props.username && <p>Logged in as: {props.username}</p>}
      {props.token && <button onClick={logMeOut}>Logout</button>}
    </header>
  );
}

export default Header;
