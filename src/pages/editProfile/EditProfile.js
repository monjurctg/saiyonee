import React, {useCallback, useEffect, useState} from "react";
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
  setEdu3PassYear,
  setEdu4PassYear,
} from "../../redux/slices/editProfileslice";
import {current} from "@reduxjs/toolkit";
import toastMsg from "../../utils/toastify";
import {setCurrentUser} from "../../redux/slices/authSlices";
import {validateAge} from "../../utils/functions";
import DateField from "../../components/DateField";
import Education2 from "../../components/editProfile/Education2";
import useSWR, {useSWRConfig} from "swr";
import fetcher from "../../utils/fetchData";
import {setEditData} from "../../redux/slices/utilsSlice";
import EditInput from "../../components/editProfile/EditInput";
import useEditForm from "../../hooks/useEditForm";
import ImageUploader from "../../components/editProfile/ImageUploader";
import PassingYearDropdown from "../../components/editProfile/PassingYearDropdown ";

const EditProfile = () => {
  const [err, setErr] = useState(null);
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {editData: user} = useSelector((state) => state.utils);
  // const url = "/app_user_edit_data";
  // const {data: user, isLoading: loading} = useSWR(url, fetcher);
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

    education3_institution,
    education3_major,
    education2_institution,

    education2_major,
    passingYear2,

    education2,
    education3,
    education4,
    education4_passing_year,
    education4_institution,
    education4_major,
    marital_status,
    religion,
    full_name,
    phone_number,
    date_of_birth,
  } = useSelector((state) => state.editProfile);

  const [inputChange, handleUserInputChange] = useEditForm();

  const [image, setimage] = useState(false);

  const dispatch = useDispatch();
  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    const res = await UserServices.getEditData();

    if (res.status === 200) {
      dispatch(setCurrentUser(res.data));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);
  let fileChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      setErr(null);
      setlength(file.size);
      setimage(file);
    }
  };

  let imageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputChange.full_name.trim() ||
      inputChange.full_name.trim().length < 6
    ) {
      setErr({
        error: "full_name",
        message:
          "Full name is required and length should be minimum 6 characters",
      });
      return;
    }
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
    }

    if (
      !validateAge(
        inputChange.date_of_birth ?? user?.date_of_birth,
        user?.gender
      )
    ) {
      setErr({
        error: "dob",
        message:
          user?.gender.trim() === "Female".trim()
            ? "Your age must be 18 or 18 plus"
            : "Your age must be 21 or 21 plus",
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

    const data = {
      display_name: inputChange.display_name ?? "",
      full_name: inputChange.full_name,

      current_city: inputChange.current_city
        ? inputChange.current_city
        : user.current_city ?? "",
      current_country: inputChange.current_country
        ? inputChange.current_country
        : user.current_country ?? "",
      education3: inputChange.education3 ?? "",
      education3_major: inputChange?.education3_major ?? "",
      education3_passing_year: passingYear3
        ? passingYear3
        : inputChange?.education3_passing_year ?? "",
      education3_institution: inputChange?.education3_institution ?? "",

      // education 4
      education4: inputChange.education4 ?? "",
      education4_major: inputChange?.education4_major ?? "",
      education4_passing_year: passingYear4
        ? passingYear4
        : inputChange.passingYear4 ?? "",
      education4_institution: inputChange?.education3_institution ?? "",

      // education 2
      education2: inputChange.education2 ?? "",
      education2_major: inputChange?.education2_major ?? "",
      education2_passing_year: passingYear2
        ? passingYear2
        : inputChange.passingYear2 ?? "",
      education4_institution: inputChange?.education2_institution ?? "",

      height_feet: inputChange?.height_feet ?? "",
      height_inches: inputChange?.height_inches ?? "",
      weight: inputChange?.weight ?? "",
      religion: religion ? religion : user?.religion,
      number_of_brothers: inputChange?.number_of_brothers ?? "",
      number_of_sisters: inputChange?.number_of_sisters ?? "",
      father_occupation: inputChange?.father_occupation ?? "",
      mother_occupation: inputChange?.mother_occupation ?? "",
      marital_status: inputChange?.marital_status ?? "",
      phone_number: inputChange?.phone_number ?? "",
      date_of_birth: inputChange?.date_of_birth ?? "",
    };
    if (image) {
      data.profile_img = image;
    }

    const res = await UserServices.edit_user_info(data);
    if (res.status === 200) {
      dispatch(setEditDisplayName(inputChange?.display_name));
      toastMsg.success("Profile edit successfully");
      setimage(false);
    } else {
      // console.log(res.response, "res");
      toastMsg.error(Object.values(res?.response.data.errors)[0][0]);
    }
  };

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
                {inputChange?.education3 ?? "  Undergraduate Education Type"}
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
      <EditInput
        label=" Undergraduate Education Institute"
        name="education3_institution"
        value={inputChange.education3_institution}
        type="text"
        onChange={handleUserInputChange}
        error={err?.error === "education3_institution"}
      />

      <EditInput
        label=" Undergraduate Education Major"
        name="education3_major"
        value={inputChange.education3_major}
        type="text"
        onChange={handleUserInputChange}
        error={err?.error === "education3_major"}
      />

      <PassingYearDropdown
        passingYear={passingYear3}
        onChange={(year) => dispatch(setEdu3PassYear(year))}
        userPassingYear={user?.education3_passing_year}
        previousPassingYear={passingYear2 || user?.education2_passing_year}
        maxHeight={200}
      />
    </>
  );

  let education4Element = (
    <>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Postgraduate Education Type
      </p>
      <div className="form-floating text-muted rounded-1">
        <Link
          onClick={() => dispatch(setEditProfile(inputChange))}
          // onClick={onEducationSelectorClicked}
          to={"/editProfile/edu4"}>
          <div
            className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
            style={{
              fontFamily: "Inter",
              border: err?.error === "education4" ? "2px solid red" : "",
            }}>
            <div className="col-10">
              <label className="form-check-label bg-white px-2 text-body">
                {inputChange?.education4 ?? "Postgraduate Education Type"}
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
        Postgraduate Education Institute
      </p>
      <div
        className="form-floating my-4 text-muted  rounded-1"
        style={{
          fontFamily: "Inter",
          border: err?.error == "education4_institution" ? "2px solid red" : "",
        }}>
        <input
          // onFocus={() => setErr()}
          type="text"
          id="inputInstitution1"
          name="education4_institution"
          style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
          value={inputChange.education4_institution}
          onChange={handleUserInputChange}
          className="form-control border-0 rounded-1"
          placeholder="institution1"
          aria-describedby="institution1"
        />
        {/* <label htmlFor="inputInstitution1">Enter candidate's institution</label> */}
      </div>

      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Postgraduate Education Major
      </p>
      <div
        className="form-floating my-4 text-muted  rounded-1"
        style={{
          fontFamily: "Inter",
          border: err?.error == "education4_major" ? "2px solid red" : "",
        }}>
        <input
          // onFocus={() => setErr()}
          type="text"
          id="inputMajor1"
          name="education4_major"
          value={inputChange.education4_major}
          style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
          setErr={setErr}
          onChange={handleUserInputChange}
          className="form-control border-0 rounded-1"
          placeholder="major1"
          aria-describedby="major1"
        />
        {/* <label htmlFor="inputMajor1">Enter major subject</label> */}
      </div>

      {/* <div className="row my-4 px-2  rounded-1">
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
              aria-expanded={year4Dropdown ? "true" : "false"}
              onClick={toggleYear4Dropdown}
              // onBlur={delayedYear4Dismiss}
            >
              {passingYear4 ? passingYear4 : user?.education4_passing_year}
            </button>
            <ul
              data-bs-popper
              className={`dropdown-menu dropdown-menu-end w-100 text-end overflow-scroll shadow border-0 p-2${
                year4Dropdown ? " show" : ""
              }`}
              style={{maxHeight: 200}}>
              {passingYears.map((year, i) => {
                if (
                  parseInt(year) >
                  parseInt(
                    passingYear3 ? passingYear3 : user?.education3_passing_year
                  )
                )
                  return (
                    <li key={i}>
                      <div
                        className={`btn btn-primary py-3 dropdown-item${
                          passingYear4 === year ? " active" : ""
                        }`}
                        onClick={() => {
                          dispatch(setEdu4PassYear(year));
                          setYear4Dropdown(false);
                        }}>
                        {year}
                      </div>
                    </li>
                  );
              })}
            </ul>
          </div>
        </div>
      </div> */}
      <PassingYearDropdown
        passingYear={passingYear4}
        onChange={(year) => dispatch(setEdu4PassYear(year))}
        userPassingYear={user?.education4_passing_year}
        previousPassingYear={passingYear3 || user?.education3_passing_year}
        maxHeight={200}
      />
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
        {/* <ImageUploader
          imageUrl={image ? URL.createObjectURL(image) : user?.profile_img}
          onImageChange={fileChange}
        /> */}

        <div className="">
          <EditInput
            label="Display Name"
            name="display_name"
            value={inputChange.display_name}
            type="text"
            setErr={setErr}
            onChange={handleUserInputChange}
            placeholder="50"
            error={err?.error === "display_name"}
          />

          <EditInput
            label=" Full name"
            name="full_name"
            type="text"
            setErr={setErr}
            value={inputChange.full_name}
            onChange={handleUserInputChange}
            // placeholder="Enter a number"
            error={err?.error === "full_name"}
          />

          <EditInput
            label="  Phone number"
            name="phone_number"
            type="text"
            setErr={setErr}
            value={inputChange.phone_number}
            onChange={handleUserInputChange}
            // placeholder="Enter a number"
            error={err?.error === "phone_number"}
          />

          <EditInput
            label="  Enter Date of Birth"
            name="date_of_birth"
            type="date"
            setErr={setErr}
            value={inputChange.date_of_birth}
            onChange={handleUserInputChange}
            // placeholder="Enter a number"
            error={err?.error === "dob"}
          />

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
                value={inputChange.height_feet ?? user?.height_feet}
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
                value={inputChange.height_inches ?? user?.height_inches}
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
              border: err?.error === "weight" ? "2px solid red" : "",
            }}>
            <input
              type="number"
              id="inputWeight"
              name="weight"
              min={1}
              onFocus={() => setErr({})}
              value={inputChange.weight ?? user?.weight}
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

          <EditInput
            label="Father's Occupation"
            name="father_occupation"
            value={inputChange.father_occupation}
            type="text"
            onChange={handleUserInputChange}
            setErr={setErr}
            // placeholder="50"
            error={err?.error === "father_occupation"}
          />
          <EditInput
            label="    Mother's Occupation"
            name="mother_occupation"
            value={inputChange.mother_occupation}
            type="text"
            setErr={setErr}
            onChange={handleUserInputChange}
            // placeholder="50"
            error={err?.error === "mother_occupation"}
          />

          <EditInput
            label="Number of Brothers"
            name="number_of_brothers"
            type="number"
            setErr={setErr}
            value={inputChange.number_of_brothers}
            onChange={handleUserInputChange}
            placeholder="Enter a number"
            error={err?.error === "number_of_brothers"}
          />
          <EditInput
            label="Number of sisters"
            name="number_of_sisters"
            type="number"
            setErr={setErr}
            value={inputChange.number_of_sisters}
            onChange={handleUserInputChange}
            placeholder="Enter a number"
            error={err?.error === "number_of_sisters"}
          />

          {maritalStatus}
          {Religion}
          {/* <Education2
            passingYears={passingYears}
            err={err}
            inputChange={inputChange}
            user={user}
            handleUserInputChange={handleUserInputChange}
          /> */}

          {/* education 3*/}
          {education3Element}

          {education4Element}

          {countryElement}
          {cityElement}
        </div>
      </div>
    </InputLayOut>
  );
};

export default EditProfile;
