import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {EDUCATION1_TYPES} from "../../constants/register_constants";
import {setEducation1, setEducation1Other} from "../../redux/slices/authSlices";
import {setEduTpe1} from "../../redux/slices/editProfileslice";

import {stoteRegisterValues} from "../../utils/functions";

function EducationTypes1({module}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {education1} = useSelector((state) => state.auth);
  const {education1: edit_education1} = useSelector(
    (state) => state.editProfile
  );

  const onTypeChange = (e) => {
    //console.log(e.target.value);

    if (e.target.value === "Other") {
      dispatch(setEducation1Other(true));
      dispatch(setEducation1(""));
    }
    if (module === "edu1") {
      dispatch(setEduTpe1(e.target.value));
    } else {
      dispatch(setEducation1Other(false));

      dispatch(setEducation1(e.target.value));
      stoteRegisterValues({education1: e.target.value});
    }
    navigate(-1);
  };
  //console.log(education1);

  return (
    <>
      <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
        <div className="container pt-4 px-4">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>
        </div>
        <div className="container px-4 pb-2 overflow-auto">
          <h1>Secondary Education</h1>
          {/* 
          <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
            <div className="col-10">
              <label htmlFor="None" className="form-check-label bg-white w-100">
                <strong>Select education</strong>
              </label>
            </div>
            <div className="col-2">
              <input
                className="form-check-input"
                type="radio"
                name="education1_type"
                checked={!education1}
                onChange={onTypeChange}
                value={undefined}
                id="None"
              />
            </div>
          </div> */}
          {EDUCATION1_TYPES.map((educationType, i) => (
            <div
              key={i}
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
              <div className="col-10">
                <label
                  htmlFor={educationType}
                  className="form-check-label bg-white w-100">
                  <strong>{educationType}</strong>
                </label>
              </div>
              <div className="col-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="education1_type"
                  checked={
                    module === "edu1"
                      ? edit_education1 === educationType
                      : education1 === educationType
                  }
                  // checked={education1 === educationType}
                  onChange={onTypeChange}
                  value={educationType}
                  id={educationType}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EducationTypes1;
