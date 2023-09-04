import React from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import RotatingImage from "../../../utilities/RotatingImage";

function Logout(props) {
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
   
        const userToken = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refresh_token");
        if (userToken) { 
          console.log("Logout is pressed so the userToken will be deleted from LocalStorage");
          localStorage.removeItem("token");
        }
        if (refreshToken) { 
          console.log("Logout is pressed so the refresh_token will be deleted from LocalStorage");
          localStorage.removeItem("refresh_token");
        }


        
        
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

export default Logout;
