import React from "react";
import male from "../assets/imgs/male.png";
import female from "../assets/imgs/female.png";

function ProfileImage({url, gender}) {
  return (
    <>
      <img
        className="user-img"
        src={url ? url : gender === "Male" ? male : female}
      />
    </>
  );
}

export default ProfileImage;
