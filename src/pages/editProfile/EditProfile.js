import React, {useEffect, useState} from "react";
import InputLayOut from "./InputLayOut";

import "./../../assets/css/editProfile.scss";
import {Link, useNavigate} from "react-router-dom";
import UserServices from "../../services/userServices";
import {useDispatch, useSelector} from "react-redux";
import HomeLayout from "../../components/layouts/HomeLayout";
import {
  setEditDisplayName,
  setEditMaritalStatus,
  setEditProfile,
  setEditProfileCountry,
  setEditReligion,
  setEdu1PassYear,
} from "../../redux/slices/editProfileslice";
import {current} from "@reduxjs/toolkit";
import toastMsg from "../../utils/toastify";
import {setCurrentUser} from "../../redux/slices/authSlices";

const EditProfile = () => {
  const [err, setErr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);
  const {
    country,
    city,
    displayName,
    height_inches,
    height_feet,
    weight,
    father_occupation,
    mother_occupation,
    number_of_brothers,
    number_of_sisters,
    passingYear3,
    passingYear4,
    eduType3,
    eduType4,
    education3_institution,
    education3_major,
    education3,
    marital_status,
    religion,
  } = useSelector((state) => state.editProfile);

  const [year1Dropdown, setYear1Dropdown] = useState(false);
  const toggleYear1Dropdown = () => setYear1Dropdown((dropdown) => !dropdown);
  const delayedYear1Dismiss = () =>
    setTimeout(() => setYear1Dropdown(false), 200);

  const [image, setimage] = useState(false);

  // const [err, sestErr] = useState();

  const passingYears = Array.from(
    new Array(new Date().getFullYear() - 1990 + 1)
  ).map((_, i) => 1990 + i);
  // console.log(user.profile_img);
  const [inputChange, setInputChange] = useState({
    display_name: displayName ? displayName : user?.display_name,
    current_country: country ? country : user?.current_country,
    current_city: city ? city : user?.current_city,
    height_feet: height_feet ? height_feet : user?.height_feet,
    height_inches: height_inches ? height_inches : user?.height_feet,
    weight: weight ? weight : user?.weight,
    education3_institution: education3_institution
      ? education3_institution
      : user?.education3_institution,
    education3_major: education3_major
      ? education3_major
      : user?.education3_major,
    education3: education3 ? education3 : user?.education3,
    education3_passing_year: passingYear3
      ? passingYear3
      : user?.education3_passing_year,

    father_occupation: father_occupation
      ? father_occupation
      : user?.father_occupation,

    mother_occupation: mother_occupation
      ? mother_occupation
      : user?.mother_occupation,
    number_of_brothers: number_of_brothers
      ? number_of_brothers
      : user?.number_of_brothers,
    number_of_sisters: number_of_sisters
      ? number_of_sisters
      : user?.number_of_sisters,
    marital_status: marital_status ? marital_status : user?.marital_status,
  });

  const dispatch = useDispatch();
  let imageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };
  const handleUserInputChange = (e) => {
    setInputChange({
      ...inputChange,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCurrentUser = async () => {
    const res = await UserServices.UserProfile();
    if (res.status === 200) {
      dispatch(setCurrentUser(res.data));
      console.log(res.data);
    }
  };
  let onSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputChange.display_name.trim() ||
      inputChange.display_name.trim().length < 3
    ) {
      setErr({
        error: "display_name",
        message:
          "Display name is required and length should be minimum 3 characters",
      });
      return;
    } else if (
      !inputChange.height_feet ||
      inputChange.height_feet > 8 ||
      inputChange.height_feet < 3
    ) {
      setErr({
        error: "ft",
        message: "Height cannot be less than 3 feet or greater than 8 feet",
      });
      return;
    } else if (
      !inputChange.height_inches ||
      inputChange.height_inches >= 12 ||
      inputChange.height_inches < 0
    ) {
      setErr({
        error: "inc",
        message:
          "Height cannot be less than 0 inches or greater than 11 inches",
      });
      return;
    }

    if (city === "Select city") {
      setErr({error: "city", message: "Please select city"});
      return;
    }
    if (
      (inputChange.weight && inputChange.weight < 30) ||
      inputChange.weight >= 181
    ) {
      setErr({
        error: "weight",
        message: "weight cannot be less than 30 kg or greater then 180 kg",
      });
      return;
    }

    // if (!religion || religion === "Select  relligion") {
    //   setErr({
    //     error: "religion",
    //     message: "Please select Religion",
    //   });
    //   return;
    // }
    // if (!marital_status || marital_status === "Select marital status") {
    //   setErr({
    //     error: "marital_status",
    //     message: "Please select marital status",
    //   });
    //   return;
    // }

    const data = {
      display_name: inputChange.display_name ?? "",

      current_city: inputChange.current_city
        ? inputChange.current_city
        : user.current_city ?? "",
      current_country: inputChange.current_country
        ? inputChange.current_country
        : user.current_country ?? "",
      education3: inputChange.education3 ?? "",
      education3_major: inputChange?.education3_major ?? "",
      education3_passing_year: inputChange?.education3_passing_year ?? "",
      education3_institution: inputChange?.education3_institution ?? "",

      height_feet: inputChange?.height_feet ?? "",
      height_inches: inputChange?.height_inches ?? "",
      weight: inputChange?.weight ?? "",
      religion: religion ? religion : user?.religion,
      number_of_brothers: inputChange?.number_of_brothers ?? "",
      number_of_sisters: inputChange?.number_of_sisters ?? "",
      father_occupation: inputChange?.father_occupation ?? "",
      mother_occupation: inputChange?.mother_occupation ?? "",
      marital_status: inputChange?.marital_status ?? "",
    };
    if (image) {
      data.profile_img = image;
    }

    const res = await UserServices.edit_user_info(data);
    if (res.status === 200) {
      dispatch(setEditDisplayName(inputChange?.display_name));
      toastMsg.success("Profile edit successfully");
      setimage(false);
      fetchCurrentUser();
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
        setErr("File size is too large");
      } else {
        setErr(null);
        setlength(file.size);
        setimage(file);
      }
    }
  };

  let education3_passing_year = 1;
  // async function fetchData() {
  //   const data = new FormData();
  //   const res = await UserServices.UserProfile();
  //   console.log(res.data);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);
  console.log(user?.religion, "religion");

  const onMaritalStatusClicked = () => {
    dispatch(setEditProfile(inputChange));
    dispatch(
      setEditMaritalStatus(
        marital_status ? marital_status : user?.marital_status
      )
    );

    // navigate("");
  };

  const onReligionSelectorClicked = () => {
    dispatch(setEditProfile(inputChange));
    dispatch(setEditReligion(religion ? religion : user?.religion));
  };
  let Religion = (
    <>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Religion
      </p>
      <Link
        to={"/editProfile/religion"}
        style={{cursor: "pointer"}}
        onClick={onReligionSelectorClicked}>
        <div
          className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
          style={{
            fontFamily: "Inter",
            border: err?.error == "religion" ? "2px solid red" : "",
          }}>
          <div className="col-10">
            <label
              className="form-check-label bg-white px-2 text-body"
              style={{fontFamily: "Inter"}}>
              {religion ? religion : user?.religion}
            </label>
          </div>
          <div className="col-2 d-flex justify-content-end pe-3">
            <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
          </div>
        </div>
      </Link>
    </>
  );

  let maritalStatus = (
    <div onClick={onMaritalStatusClicked}>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Marital staus
      </p>
      <Link
        to={"/editProfile/marital_status"}
        className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
        style={{
          fontFamily: "Inter",
          cursor: "pointer",
          border: err?.error == "marital_status" ? "2px solid red" : "",
        }}>
        <div className="col-10">
          <label className="form-check-label bg-white px-2 text-body">
            {inputChange.marital_status}
          </label>
        </div>
        <div className="col-2 d-flex justify-content-end pe-3">
          <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
        </div>
      </Link>
    </div>
  );

  let education3Element = (
    <>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Undergraduate Education Type
      </p>
      <div className="form-floating text-muted rounded-1">
        <Link
          onClick={() => dispatch(setEditProfile(inputChange))}
          // onClick={onEducationSelectorClicked}
          to={"/editProfile/edu3"}>
          <div
            className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
            style={{
              fontFamily: "Inter",
              border: err?.error == "education3" ? "2px solid red" : "",
            }}>
            <div className="col-10">
              <label className="form-check-label bg-white px-2 text-body">
                {inputChange?.education3}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </Link>
        {/* 
        <label style={{fontFamily: "Inter"}} htmlFor="">
          Secondary Education Type
        </label> */}
      </div>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Undergraduate Education Institute
      </p>
      <div
        className="form-floating my-4 text-muted  rounded-1"
        style={{
          fontFamily: "Inter",
          border: err?.error == "education3_institution" ? "2px solid red" : "",
        }}>
        <input
          // onFocus={() => setErr()}
          type="text"
          id="inputInstitution1"
          name="education3_institution"
          value={inputChange.education3_institution}
          onChange={handleUserInputChange}
          className="form-control border-0 rounded-1"
          placeholder="institution1"
          aria-describedby="institution1"
        />
        {/* <label htmlFor="inputInstitution1">Enter candidate's institution</label> */}
      </div>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Undergraduate Education Major
      </p>
      <div
        className="form-floating my-4 text-muted  rounded-1"
        style={{
          fontFamily: "Inter",
          border: err?.error == "education3_major" ? "2px solid red" : "",
        }}>
        <input
          // onFocus={() => setErr()}
          type="text"
          id="inputMajor1"
          name="education3_major"
          value={inputChange.education3_major}
          onChange={handleUserInputChange}
          className="form-control border-0 rounded-1"
          placeholder="major1"
          aria-describedby="major1"
        />
        <label htmlFor="inputMajor1">Enter major subject</label>
      </div>

      <div className="row my-4 px-2  rounded-1">
        <div className="col-8 d-flex align-items-center">
          <label className="form-check-label px-2 text-muted">
            Select passing year
          </label>
        </div>
        <div className="col-4">
          <div className="dropup bg-white rounded-1">
            <button
              type="button"
              className="btn btn-outline-primary shadow-2 py-3 dropdown-toggle w-100 rounded-1 border-0"
              data-bs-toggle="dropdown"
              aria-expanded={year1Dropdown ? "true" : "false"}
              onClick={toggleYear1Dropdown}
              onBlur={delayedYear1Dismiss}>
              {passingYear3 ? passingYear3 : user?.education3_passing_year}
            </button>
            <ul
              data-bs-popper
              className={`dropdown-menu dropdown-menu-end w-100 text-end overflow-scroll shadow border-0 p-2${
                year1Dropdown ? " show" : ""
              }`}
              style={{maxHeight: 200}}>
              {passingYears.map((year, i) => (
                <li key={i}>
                  <div
                    onClick={() => {
                      dispatch(setEdu1PassYear(year));
                    }}
                    className={`btn btn-primary py-3 dropdown-item${
                      passingYear3 === year ? " " : ""
                    }`}>
                    {year}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  let countryElement = (
    <>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Current country
      </p>
      <Link
        to={"/editProfile/country"}
        onClick={() => {
          dispatch(setEditProfile(inputChange));
          dispatch(
            setEditProfileCountry(country ? country : user?.current_country)
          );
        }}>
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
            <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
          </div>
        </div>
      </Link>
    </>
  );

  let cityElement = (
    <>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Current city
      </p>
      <Link to={"/editProfile/city"}>
        <div
          className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
          style={{
            fontFamily: "Inter",
            border: err?.error === "city" ? "2px solid red" : "",
          }}>
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
            <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
          </div>
        </div>
      </Link>
    </>
  );

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
            Display Name
          </p>
          <div
            className="form-floating text-muted me-2 rounded-1"
            style={{
              fontFamily: "Inter",

              border: err?.error == "display_name" ? "2px solid red" : "",
            }}>
            <input
              type="text"
              name="display_name"
              id="inputHeightInches"
              style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
              value={inputChange?.display_name}
              onChange={(e) =>
                setInputChange({...inputChange, display_name: e.target.value})
              }
              onFocus={() => setErr(null)}
              placeholder={"Form"}
              className="form-control border-0 rounded-1"
              aria-describedby="height_inches"
            />
          </div>
          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Height Feet & Inches
          </p>

          <div className="d-flex">
            <div
              className="form-floating  text-muted me-2 rounded-1"
              style={{
                fontFamily: "Inter",

                border: err?.error == "ft" ? "2px solid red" : "",
              }}>
              <input
                type="number"
                id="inputHeightFeet"
                name="height_feet"
                min={1}
                onFocus={() => setErr(null)}
                style={{fontFamily: "Inter"}}
                value={inputChange.height_feet}
                onChange={handleUserInputChange}
                className="form-control border-0 rounded-1"
                // placeholder={MIN_HEIGHT_FEET.toString()}
                aria-describedby="height_feet"
              />
              <label htmlFor="inputHeightFeet" style={{fontFamily: "Inter"}}>
                ft
              </label>
            </div>
            <div
              className="form-floating text-muted ms-2 rounded-1"
              style={{
                fontFamily: "Inter",
                border: err?.error == "inc" ? "2px solid red" : "",
              }}>
              <input
                type="number"
                name="height_inches"
                min={0}
                onFocus={() => setErr(null)}
                id="inputHeightInches"
                style={{fontFamily: "Inter"}}
                value={inputChange.height_inches}
                onChange={handleUserInputChange}
                className="form-control border-0 rounded-1"
                aria-describedby="height_inches"
              />
              <label htmlFor="inputHeightInches" style={{fontFamily: "Inter"}}>
                in
              </label>
            </div>
          </div>
          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Weight
          </p>

          <div
            className="form-floating text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "weight" ? "2px solid red" : "",
            }}>
            <input
              type="number"
              id="inputWeight"
              name="weight"
              min={1}
              onFocus={() => setErr({})}
              value={inputChange.weight}
              style={{fontFamily: "Inter"}}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              aria-describedby="weight"
            />
            <label htmlFor="inputWeight" style={{fontFamily: "Inter"}}>
              KG
            </label>
          </div>

          {/* family */}
          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Father's Occupation
          </p>

          <div className="form-floating text-muted rounded-1">
            <input
              type="text"
              name="father_occupation"
              id="inputFather"
              value={inputChange.father_occupation}
              onChange={handleUserInputChange}
              style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
              className="form-control border-0 rounded-1 text-start"
              // placeholder="50"

              aria-describedby="BrotherCount"
            />
          </div>
          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Mother's Occupation
          </p>

          <div className="form-floating text-muted rounded-1">
            <input
              type="text"
              name="mother_occupation"
              id="inputMother"
              value={inputChange.mother_occupation}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1 text-start"
              // placeholder="50"
              style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
              aria-describedby="BrotherCount"
            />
          </div>

          <p
            className="text-muted text-start mt-4"
            style={{fontFamily: "Inter"}}>
            Number of Brothers
          </p>

          <div className="form-floating text-muted rounded-1">
            <input
              type="number"
              style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
              name="number_of_brothers"
              id="inputBrotherCount"
              value={inputChange.number_of_brothers}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1 "
              // placeholder="50"
              aria-describedby="BrotherCount"
            />
          </div>

          <p className="text-muted  text-start mb-2">Number of sisters</p>

          <div className="form-floating text-muted rounded-1">
            <input
              type="number"
              name="number_of_sisters"
              id="inputSisterCount"
              style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
              value={inputChange.number_of_sisters}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1  "
              // placeholder="50"
              aria-describedby="inputSisterCount"
            />
          </div>

          {maritalStatus}
          {Religion}

          {/* education 3*/}
          {/* {education3Element} */}

          {countryElement}
          {cityElement}
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
