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
const [images, setimages] = useState({
    optional_img_1: "",
    optional_img_2: "",
    optional_img_3: "",
    optional_img_4: "",
    optional_img_5: "",
})

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
    console.log('file', e.target.name)
    if (file) {
      if (file.size > 1000000) {
        seterr("File size is too large");
      } else {
        seterr(null);
        setlength(file.size);
        // setimage(file);
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
      <div className="question mt-3 d-flex flex-wrap" style={{
        gap: 20
      }}>
        <div className="image-upload" style={{
                width:"40%",
                height: 150,
                margin:0
        }}>
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: images?.optional_img_1 && "none", cursor: "pointer"}}
          />

          <img
            src={images?.optional_img_1 && URL.createObjectURL(images?.optional_img_1)}
            alt=""
            onClick={imageClick}
            style={{
              width: images?.optional_img_1 && "100%",
              borderRadius: 24,
              height: images?.optional_img_1 && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            name="optional_img_1"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>
        <div className="image-upload" style={{
                width:"40%",
                height: 150,
                margin:0
        }}>
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: images?.optional_img_2 && "none", cursor: "pointer"}}
          />

          <img
            src={images?.optional_img_2 && URL.createObjectURL(images?.optional_img_2)}
            alt=""
            onClick={imageClick}
            style={{
              width: images?.optional_img_2 && "100%",
              borderRadius: 24,
              height: images?.optional_img_2 && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
            name="optional_img_2"
          />
        </div>
        <div className="image-upload" style={{
                width:"40%",
                height: 150,
                margin:0
        }}>
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: images?.optional_img_3 && "none", cursor: "pointer"}}
          />

          <img
            src={images?.optional_img_3 && URL.createObjectURL(images?.optional_img_3)}
            alt=""
            onClick={imageClick}
            style={{
              width: images?.optional_img_3 && "100%",
              borderRadius: 24,
              height: images?.optional_img_3 && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
            name="optional_img_3"
          />
        </div>
        <div className="image-upload" style={{
                width:"40%",
                height: 150,
                margin:0
        }}>
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: images?.optional_img_4 && "none", cursor: "pointer"}}
          />

          <img
            src={images?.optional_img_4 && URL.createObjectURL(images?.optional_img_4)}
            alt=""
            onClick={imageClick}
            style={{
              width: images?.optional_img_4 && "100%",
              borderRadius: 24,
              height: images?.optional_img_4 && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            name="optional_img_4"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>
        <div className="image-upload" style={{
                width:"40%",
                height: 150,
                margin:0
        }}>
          <img
            src="/img/plus-round.svg"
            alt=""
            onClick={imageClick}
            style={{display: images?.optional_img_5 && "none", cursor: "pointer"}}
          />

          <img
            src={images?.optional_img_5 && URL.createObjectURL(images?.optional_img_5)}
            alt=""
            onClick={imageClick}
            style={{
              width: images?.optional_img_5 && "100%",
              borderRadius: 24,
              height: images?.optional_img_5 && "100%",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
            name="optional_img_5"
          />
        </div>
      </div>
    </InputLayOut>
  );
};

export default GalleryImage;
