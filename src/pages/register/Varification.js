import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";
import { ID_TYPES } from "../../constants/register_constants";
import { useRegisterMutation } from "../../redux/api/authApi";
import {
  setVerificationImg1,
  setVerificationImg2,
  setVerificationType,
} from "../../redux/slices/authSlices";
import { initialRegState } from "../../redux/slices/initialRegState";
import AuthServices from "../../services/authServices";

function Varification() {
  const [err, setErr] = useState();

  const navigator = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown((dropdown) => !dropdown);
  const delayedDismiss = () => setTimeout(() => setDropdown(false), 200);
  const [redirect, setRedirect] = useState("");
  // let verification_type = "National ID";
  const dispatch = useDispatch();

  // // let dropdown = "";
  // let ID_TYPES = ["abc", "bcd", "xyz"];
  // let verification_img1 = true;
  // let verification_img2 = true;
  const {
    full_name,
    email,
    password,
    password_confirmation,
    user_type,
    gender,
    date_of_birth,
    education1,
    education1_institution,
    education1_major,
    education1_passing_year,
    education2,
    education2_institution,
    education2_major,
    education2_passing_year,
    education3,
    education3_institution,
    education3_major,
    education3_passing_year,
    education4,
    education4_institution,
    education4_major,
    education4_passing_year,
    current_employment_type,
    industry,
    working_since,
    employer_name,
    designation,
    religion,
    height_feet,
    height_inches,
    weight,
    marital_status,
    current_country,
    current_city,
    father_occupation,
    father_home_district,
    mother_occupation,
    mother_home_district,
    number_of_brothers,
    number_of_sisters,
    verification_type,
    verification_img1,
    verification_img2,
  } = useSelector((state) => state.auth);
  let data = {
    full_name: full_name,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
    user_type: user_type,
    gender: gender,
    date_of_birth: date_of_birth,
    education1: education1,
    education1_institution: education1_institution,
    education1_major: education1_major,
    education1_passing_year: education1_passing_year,
    education2: education2,
    education2_institution: education2_institution,
    education2_major: education2_major,
    education2_passing_year: education2_passing_year,
    education3: education3,
    education3_institution: education3_institution,
    education3_major: education3_major,
    education3_passing_year: education3_passing_year,
    education4: education4,
    education4_institution: education4_institution,
    education4_major: education4_major,
    education4_passing_year: education4_passing_year,
    current_employment_type: current_employment_type,
    industry: industry,
    working_since: working_since,
    employer_name: employer_name,
    designation: designation,
    religion: religion,
    height_feet: height_feet,
    height_inches: height_inches,
    weight: weight,
    marital_status: marital_status,
    current_country: current_country,
    current_city: current_city,
    father_occupation: father_occupation,
    father_home_district: father_home_district,
    mother_occupation: mother_occupation,
    mother_home_district: mother_home_district,
    number_of_brothers: number_of_brothers,
    number_of_sisters: number_of_sisters,
    verification_type: verification_type,
    verification_img1: verification_img1,
    verification_img2: verification_img2,
  };

  let onContinueClicked = async () => {
    let d = JSON.stringify(window.localStorage.getItem("register"));
    // console.log('d', d)
    let formd = new FormData();
    Object.keys(data).map((key) => {
      formd.append(key, data[key]);
    });
    console.log("data", formd);

    const res = await AuthServices.register(formd);
    console.log(res, "fetch res");
    if (res.status === 200) {
      navigator("/register/success");
    } else {
      console.log("error");
    }
    // register({data}).then((da) => {
    //   // navigator("/register/success");
    //   console.log(da,'das');
    // });
  };
  return (
    <>
      <RegisterLayout onContinueClicked={onContinueClicked}>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <div className="text-center">
            <h1>ID Verification</h1>
            <p className="text-muted mt-3 mb-2">
              (NID / Passport / Driving License / Birth Certificate)
            </p>
            <img src="/img/id-verification.svg" alt="back" />
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-primary shadow py-3 dropdown-toggle w-100 rounded-1"
              data-bs-toggle="dropdown"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={toggleDropdown}
              onBlur={delayedDismiss}
            >
              ID Type: {verification_type}
            </button>
            <ul
              className={`dropdown-menu w-100 p-2 shadow border-0 ${
                dropdown ? " show" : ""
              }`}
            >
              {ID_TYPES.map((idType, i) => (
                <li key={i}>
                  <div style={{width:"100%"}}
                    className={`btn py-3 dropdown-item${
                      verification_type === idType ? " active" : ""
                    }`}
                    onClick={() => dispatch(setVerificationType(idType))}
                  >
                    {idType}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-muted mt-5 mb-3">
            Please provide a Photo of the
            <span className="text-primary"> Front</span>{" "}
            {verification_type === "National ID" && (
              <>
                and <span className="text-primary">Back </span>
              </>
            )}
            side of your ID
          </p>
          <div className="d-flex my-4 justify-content-around">
            <div className="position-relative">
              <button className="btn btn-outline-primary border-0 shadow p-0 rounded-1">
                <label htmlFor="fileFrontSide" className="form-label mb-0">
                  <img
                    src={
                      verification_img1
                        ? URL.createObjectURL(verification_img1)
                        : "/img/add-photo.svg"
                    }
                    // src="/img/add-photo.svg"
                    alt="add id card"
                    style={{ width: 136, height: 172 }}
                    className="object-cover rounded-1"
                  />
                </label>
                <input
                  className="form-control d-none"
                  type="file"
                  accept="image/*"
                  id="fileFrontSide"
                  onChange={(e) =>
                    dispatch(setVerificationImg1(e.target.files[0]))
                  }
                />
              </button>
              {!verification_img1 && (
                <div
                  className="position-absolute text-center"
                  style={{ bottom: "20%", left: 0, right: 0 }}
                >
                  Front Side
                </div>
              )}
            </div>
            {verification_type === "National ID" && (
              <div className="position-relative">
                <button className="btn btn-outline-primary border-0 shadow p-0 rounded-1">
                  <label htmlFor="fileBackSide" className="form-label mb-0">
                    <img
                      src={
                        verification_img2
                          ? URL.createObjectURL(verification_img2)
                          : "/img/add-photo.svg"
                      }
                      alt="add id card"
                      style={{ width: 136, height: 172 }}
                      className="object-cover rounded-1"
                    />
                  </label>
                  <input
                    className="form-control d-none"
                    type="file"
                    accept="image/*"
                    id="fileBackSide"
                    onChange={(e) =>
                      // console.log('e', e.target.files[0])
                      dispatch(setVerificationImg2(e.target.files[0]))
                    }
                  />
                </button>
                {!verification_img2 && (
                  <div
                    className="position-absolute text-center"
                    style={{ bottom: "20%", left: 0, right: 0 }}
                  >
                    Back Side
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </RegisterLayout>
    </>
  );
}

export default Varification;
