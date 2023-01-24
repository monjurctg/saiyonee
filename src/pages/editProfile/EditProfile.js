import React, {useEffect, useState} from "react";
import InputLayOut from "./InputLayOut";

import "./../../assets/css/editProfile.scss";
import {Link} from "react-router-dom";
import UserServices from "../../services/userServices";
import {useSelector} from "react-redux";

const EditProfile = () => {
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
      title={"Edit Profile"}
      loading={loading}>
      <div className="question mt-3">
        <div className="image-upload mt-4">
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

        <div className="mt-5 pt-5">
          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Edit your display name
          </p>
          <div
            className="form-floating my-3 text-muted me-2 rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "age_from" ? "2px solid red" : "",
            }}>
            <input
              type="number"
              name="age_from"
              id="inputHeightInches"
              style={{fontFamily: "Inter"}}
              // value={state.age_from}
              // onChange={handleUserInputChange}
              placeholder={"Form"}
              className="form-control border-0 rounded-1"
              aria-describedby="height_inches"
            />
            <label htmlFor="inputHeightInches" style={{fontFamily: "Inter"}}>
              Display name
            </label>
          </div>

          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Change your current country
          </p>
          <Link to={"/editProfile/country"}>
            <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label
                  className="form-check-label  bg-white px-2 text-body"
                  style={{fontFamily: "Inter", cursor: "pointer"}}>
                  {country ? country : "Select country"}
                </label>
              </div>

              <div className="col-2 d-flex justify-content-end pe-3">
                <img
                  src="/img/back-icon.svg"
                  alt="next"
                  className="rotate-180"
                />
              </div>
            </div>
          </Link>
          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Change your current city
          </p>
          <Link to={"/editProfile/city"}>
            <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label
                  className="form-check-label  bg-white px-2 text-body"
                  style={{fontFamily: "Inter", cursor: "pointer"}}>
                  {/* {religion} */}
                  {city ? city : "Select City"}
                </label>
              </div>

              <div className="col-2 d-flex justify-content-end pe-3">
                <img
                  src="/img/back-icon.svg"
                  alt="next"
                  className="rotate-180"
                />
              </div>
            </div>
          </Link>
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

export default EditProfile;
