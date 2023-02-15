import React, {useEffect, useState} from "react";
import InputLayOut from "./InputLayOut";

import "./../../assets/css/editProfile.scss";
import {Link} from "react-router-dom";
import UserServices from "../../services/userServices";
import {useDispatch, useSelector} from "react-redux";
import HomeLayout from "../../components/layouts/HomeLayout";
import {setEditDisplayName} from "../../redux/slices/editProfileslice";
import {current} from "@reduxjs/toolkit";
import toastMsg from "../../utils/toastify";

const EditProfile = () => {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);

  const {user} = useSelector((state) => state.auth);
  const {country, city, displayName} = useSelector(
    (state) => state.editProfile
  );
  const [image, setimage] = useState(false);
  // console.log(user.profile_img);
  const [inputChange, setInputChange] = useState({
    display_name: displayName
      ? displayName
      : user?.display_name ?? user?.full_name,
    current_country: country ? country : user?.current_country,
    current_city: city ? city : user?.current_city,
  });

  const dispatch = useDispatch();
  let imageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      display_name: inputChange.display_name
        ? inputChange.display_name
        : user.display_name,
      current_city: inputChange.current_city
        ? inputChange.current_city
        : user.current_city,
      current_country: inputChange.current_country
        ? inputChange.current_country
        : user.current_country,
      profile_img: image ? image : "",
    };

    const res = await UserServices.edit_user_info(data);
    if (res.status === 200) {
      toastMsg.success("Profile edit successfully");
    } else {
      toastMsg.error(res.data.message);
    }
    // console.log(res, "edit res");
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

  // async function fetchData() {
  //   const data = new FormData();
  //   const res = await UserServices.UserProfile();
  //   console.log(res.data);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);
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
            style={{
              display: (image || user?.profile_img) && "none",
              cursor: "pointer",
            }}
          />

          <img
            src={image ? URL.createObjectURL(image) : user?.profile_img}
            alt=""
            onClick={imageClick}
            style={{
              width: "100%",
              borderRadius: 24,
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          <input
            type="file"
            id="image"
            style={{display: "none"}}
            onChange={fileChange}
          />
        </div>

        <div className="">
          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Change your Display Name
          </p>
          <div
            className="form-floating my-3 text-muted me-2 rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "age_from" ? "2px solid red" : "",
            }}>
            <input
              type="text"
              name="age_from"
              id="inputHeightInches"
              style={{fontFamily: "Inter"}}
              value={inputChange?.display_name}
              onChange={(e) => setInputChange({display_name: e.target.value})}
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
          <Link
            to={"/editProfile/country"}
            onClick={() =>
              dispatch(setEditDisplayName(inputChange?.display_name))
            }>
            <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label
                  className="form-check-label  bg-white px-2 text-body"
                  style={{fontFamily: "Inter", cursor: "pointer"}}>
                  {inputChange?.current_country
                    ? inputChange?.current_country
                    : "Select country"}
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
                  {inputChange.current_city
                    ? inputChange.current_city
                    : "Select City"}
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
