import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../general/var/constdecl";

function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    // You can set your token here
    const token = "YOUR_ACCESS_TOKEN";

    // Define your headers with the Authorization header
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios({
      method: "GET",
      url: `${API_URL}/my_profile`, // Use the desired URL here
      headers: headers,
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });
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
    <div className="Profile">
      <p>To get your profile details: </p>
      <button onClick={getData}>Click me</button>
      {profileData && (
        <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
