import React from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";

function Logout(props) {
  function logMeOut() {
    axios({
      method: "POST",
      url: `${API_URL}/logout_user`,
    })
      .then((response) => {
        props.token();

        const userToken = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refresh_token");
        const userid = localStorage.getItem("loggedInUserid");
        const empname = localStorage.getItem("name");
        const emp_img = localStorage.getItem("emp_img")

        if (userToken) {
          localStorage.removeItem("token");
        }
        if (refreshToken) {
          localStorage.removeItem("refresh_token");
        }

        if (userid) {
          localStorage.removeItem("loggedInUserid");
        }
        if (empname) {
          localStorage.removeItem("name");
        }
        if (emp_img) {
          localStorage.removeItem("emp_img");
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
    <div>
      {props.username && <p>Logged in as: {props.username}</p>}
      {props.token && <button onClick={logMeOut}>Logout</button>}
    </div>
  );
}

export default Logout;
