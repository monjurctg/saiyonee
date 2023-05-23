import React from "react";
import male from "../assets/imgs/male.png";
import female from "../assets/imgs/female.png";

function ProfileImage({url, gender, style}) {
  let f = "Female";
  let m = "male";

  // //console.log(gender?.toLowerCase?.trim);
  return (
    <>
      <img
        alt=""
        style={{...style}}
        className="user-img"
        src={
          url
            ? url
            : gender?.toLowerCase()?.trim() === "male"
            ? male
            : gender?.toLowerCase()?.trim() === "female"
            ? female
            : "No Image"
        }
      />
    </>
  );
}

export default ProfileImage;
