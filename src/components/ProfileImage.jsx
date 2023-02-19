import React from "react";
import male from "../assets/imgs/male.png";
import female from "../assets/imgs/female.png";

function ProfileImage({url, gender, style}) {
  return (
    <>
      <img
        style={{...style}}
        className="user-img"
        src={
          url
            ? url
            : gender?.toLowerCase() === "male"
            ? male
            : gender?.toLowerCase() === "female"
            ? female
            : "No Image"
        }
      />
    </>
  );
}

export default ProfileImage;