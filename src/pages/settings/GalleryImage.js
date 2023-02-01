import React, {useEffect, useState} from "react";
// import InputLayOut from "./InputLayOut";

import "./../../assets/css/editProfile.scss";
import {Link} from "react-router-dom";
import UserServices from "../../services/userServices";
import {useSelector} from "react-redux";
import InputLayOut from "../editProfile/InputLayOut";

const GalleryImage = () => {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState(false);
  const {country, city} = useSelector((state) => state.editProfile);

  let imageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    // console.log("inputs");
  };

  let fileChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      if (file.size > 1000000) {
        seterr("File size is too large");
      } else {
        seterr(null);
        setlength(file.size);
        setimage(file);
      }
    }
  };

  async function fetchData() {
    const data = new FormData();
    const res = await UserServices.UserProfile();
    console.log('res.data', res.data)
    console.log(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <InputLayOut
      err={err}
      onContinueClicked={onSubmit}
      length={length}
      title={"Image Gallery"}
      loading={loading}>
      <div className="question mt-3 d-flex flex-wrap">
        <div className="image-upload">
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: image && "none", cursor: "pointer"}}
          />

          <img
            src={image && URL.createObjectURL(image)}
            alt=""
            onClick={imageClick}
            style={{
              width: image && "100%",
              borderRadius: 24,
              height: image && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>
        <div className="image-upload">
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: image && "none", cursor: "pointer"}}
          />

          <img
            src={image && URL.createObjectURL(image)}
            alt=""
            onClick={imageClick}
            style={{
              width: image && "100%",
              borderRadius: 24,
              height: image && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>
        <div className="image-upload">
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: image && "none", cursor: "pointer"}}
          />

          <img
            src={image && URL.createObjectURL(image)}
            alt=""
            onClick={imageClick}
            style={{
              width: image && "100%",
              borderRadius: 24,
              height: image && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>
        <div className="image-upload">
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: image && "none", cursor: "pointer"}}
          />

          <img
            src={image && URL.createObjectURL(image)}
            alt=""
            onClick={imageClick}
            style={{
              width: image && "100%",
              borderRadius: 24,
              height: image && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>
          <div className="image-upload">
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: image && "none", cursor: "pointer"}}
          />

          <img
            src={image && URL.createObjectURL(image)}
            alt=""
            onClick={imageClick}
            style={{
              width: image && "100%",
              borderRadius: 24,
              height: image && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>

  

        {/* <div className="add-photos">
          <div className="add-photo">
            <p>Add a Photo</p>
          </div>
          <div className="add-photo">
            {" "}
            <p>Add a Photo</p>
          </div>
          <div className="add-photo">
            {" "}
            <p>Add a Photo</p>
          </div>
          <div className="add-photo">
            {" "}
            <p>Add a Photo</p>
          </div>
        </div> */}
      </div>
    </InputLayOut>
  );
};

export default GalleryImage;
