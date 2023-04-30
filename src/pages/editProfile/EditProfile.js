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
  setEdu2PassYear,
  setEdu3PassYear,
  setEdu4PassYear,
  setEduTpe1,
  setEduTpe2,
  setEduTpe3,
  setEduTpe4,
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
import EducationLayout from "../../components/layouts/EducationLayout";
import InputWithLabel from "../../components/InputType/InputWithLabel";
import errors from "../../components/errors/commonError";

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

    passingYear3,
    passingYear4,
    passingYear1,

    education3_institution,
    education3_major,
    education2_institution,

    education2_major,
    passingYear2,

    education2,
    education1,
    education3,
    education4,
    education4_passing_year,
    education4_institution,
    education4_major,
    marital_status,
    religion,
    date_of_birth,
  } = useSelector((state) => state.editProfile);

  const [inputChange, handleUserInputChange] = useEditForm();
  const dateOfBirthYear =
    new Date(
      date_of_birth ? date_of_birth : inputChange.date_of_birth
    ).getFullYear() + 10;

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

    let error = errors.validation(setErr, inputChange, user, city);
    if (error) return;

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
      education2_institution: inputChange?.education2_institution ?? "",
      // education 1

      education1: inputChange.education1 ?? "",
      education1_major: inputChange?.education1_major ?? "",
      education1_passing_year: passingYear1
        ? passingYear1
        : inputChange.passingYear1 ?? "",
      education1_institution: inputChange?.education1_institution ?? "",

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
  };

  const onReligionSelectorClicked = () => {
    dispatch(setEditProfile(inputChange));
    dispatch(setEditReligion(religion ? religion : user?.religion));
  };
  const onEdu1SelectorClicked = () => {
    dispatch(setEditProfile(inputChange));
    dispatch(setEduTpe1(education1 ? education1 : user?.education1));
  };
  const onEdu2SelectorClicked = () => {
    dispatch(setEditProfile(inputChange));
    dispatch(setEduTpe2(education2 ? education2 : user?.education2));
  };
  const onEdu3SelectorClicked = () => {
    // alert("djkskjk");
    dispatch(setEditProfile(inputChange));
    dispatch(setEduTpe3(education3 ? education3 : user?.education3));
  };
  const onEdu4SelectorClicked = () => {
    // alert("djkskjk");
    dispatch(setEditProfile(inputChange));
    dispatch(setEduTpe4(education4 ? education4 : user?.education4));
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
    <EducationLayout
      onEducationSelectorClicked={onEdu3SelectorClicked}
      to={"/editProfile/edu3"}
      inputChange={inputChange}
      err={err}
      label={inputChange.education3}
      type={"education3"}
      title="Undergraduate Education">
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
        onChange={(year) => {
          dispatch(setEdu3PassYear(year));

          dispatch(setEdu4PassYear(" "));
        }}
        userPassingYear={user?.education3_passing_year}
        previousPassingYear={passingYear2 || user?.education2_passing_year}
        maxHeight={200}
      />
    </EducationLayout>
  );

  let education2Element = (
    <EducationLayout
      onEducationSelectorClicked={onEdu2SelectorClicked}
      to={"/editProfile/edu2"}
      inputChange={inputChange}
      err={err}
      label={inputChange.education2}
      type={"education2"}
      title="Higher Secondary  Education">
      <EditInput
        label=" Higher Secondary  Education Institute"
        name="education2_institution"
        value={inputChange.education2_institution}
        type="text"
        onChange={handleUserInputChange}
        error={err?.error === "education2_institution"}
      />

      <EditInput
        label=" Higher Secondary  Education Major"
        name="education2_major"
        value={inputChange.education2_major}
        type="text"
        onChange={handleUserInputChange}
        error={err?.error === "education2_major"}
      />

      <PassingYearDropdown
        passingYear={passingYear2}
        onChange={(year) => {
          dispatch(setEdu2PassYear(year));
          dispatch(setEdu3PassYear("  "));
          dispatch(setEdu4PassYear(" "));
        }}
        userPassingYear={user?.education2_passing_year}
        previousPassingYear={passingYear1 || user?.education1_passing_year}
        maxHeight={200}
      />
    </EducationLayout>
  );

  let education1Element = (
    <EducationLayout
      onEducationSelectorClicked={onEdu1SelectorClicked}
      to={"/editProfile/edu1"}
      inputChange={inputChange}
      err={err}
      label={inputChange.education1}
      type={"education1"}
      title=" Secondary  Education">
      <EditInput
        label="  Secondary  Education Institute"
        name="education1_institution"
        value={inputChange.education1_institution}
        type="text"
        onChange={handleUserInputChange}
        error={err?.error === "education1_institution"}
      />

      <EditInput
        label="  Secondary  Education Major"
        name="education1_major"
        value={inputChange.education1_major}
        type="text"
        onChange={handleUserInputChange}
        error={err?.error === "education1_major"}
      />

      <PassingYearDropdown
        passingYear={passingYear1}
        onChange={(year) => {
          dispatch(setEdu1PassYear(year));
          dispatch(setEdu2PassYear(" "));
          dispatch(setEdu3PassYear("  "));
          dispatch(setEdu4PassYear(" "));
        }}
        userPassingYear={user?.education1_passing_year}
        previousPassingYear={dateOfBirthYear || user?.date_of_birth}
        maxHeight={200}
      />
    </EducationLayout>
  );

  let education4Element = (
    <EducationLayout
      to={"/editProfile/edu4"}
      onEducationSelectorClicked={onEdu4SelectorClicked}
      inputChange={inputChange}
      err={err}
      label={inputChange.education4}
      type={"education4"}
      title="Postgraduate Education">
      <EditInput
        label=" Postgraduate Education Institute"
        name="education4_institution"
        value={inputChange.education4_institution}
        type="text"
        onChange={handleUserInputChange}
        error={err?.error === "education4_institution"}
      />

      <EditInput
        label=" Postgraduate Education Major"
        name="education4_major"
        value={inputChange.education4_major}
        type="text"
        onChange={handleUserInputChange}
        error={err?.error === "education4_major"}
      />

      <PassingYearDropdown
        passingYear={passingYear4}
        onChange={(year) => dispatch(setEdu4PassYear(year))}
        userPassingYear={user?.education4_passing_year}
        previousPassingYear={passingYear3 || user?.education3_passing_year}
        maxHeight={200}
      />
    </EducationLayout>
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
            <InputWithLabel
              // label={" Weight"}
              value={inputChange.height_feet}
              onFocus={() => setErr({})}
              errorType={"ft"}
              error={err}
              type={"number"}
              min={0}
              name={"height_feet"}
              underInputLabel={"ft"}
              onChange={handleUserInputChange}
            />
            <div className="ms-2">
              <InputWithLabel
                // label={" Weight"}
                value={inputChange.height_inches}
                onFocus={() => setErr({})}
                errorType={"inc"}
                error={err}
                type={"number"}
                min={0}
                name={"height_inches"}
                underInputLabel={"in"}
                onChange={handleUserInputChange}
              />
            </div>
          </div>

          <InputWithLabel
            label={" Weight"}
            value={inputChange.weight}
            onFocus={() => setErr({})}
            errorType={"weight"}
            error={err}
            type={"number"}
            min={1}
            name={"weight"}
            underInputLabel={"KG"}
            onChange={handleUserInputChange}
          />

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

          {countryElement}
          {cityElement}

          {education1Element}
          {education2Element}

          {/* education 3*/}
          {education3Element}

          {education4Element}
        </div>
      </div>
    </InputLayOut>
  );
};

export default EditProfile;
