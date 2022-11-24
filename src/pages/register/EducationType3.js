import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {EDUCATION3_TYPES} from "../../constants/register_constants";

function EducationType3() {
  const navigate = useNavigate();

  const [education3, setEducation3] = useState("");
  const [education1Other, setEducation3Other] = useState("");
  const onTypeChange = (e) => {
    if (e.target.value === "Other") {
      setEducation3Other(true);
      setEducation3("");
    } else {
      setEducation3Other(false);
      setEducation3(e.target.value);
    }
    navigate(-1);
  };
  console.log(education3);
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
          <h1>Undergrad Education</h1>
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
                name="education3_type"
                checked={!education3}
                onChange={onTypeChange}
                value={undefined}
                id="None"
              />
            </div>
          </div>
          {EDUCATION3_TYPES.map((educationType, i) => (
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
                  name="education3_type"
                  checked={education3 === educationType}
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

export default EducationType3;
