import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {GENDER_TYPES} from "../../constants/register_constants";
import {setPersonalInfo} from "../../redux/slices/authSlices";

function PersonalInformation() {
  let err = "";
  // let gender = "male";
  // let marital_status = "marid";

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    full_name,
    date_of_birth,
    height_inches,
    height_feet,
    gender,
    weight,
    marital_status,
    religion,
  } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    full_name: full_name,
    date_of_birth: date_of_birth,
    height_ft: height_feet,
    height_inc: height_inches,
    weight: weight,
    gender: gender,
  });

  const handleUserInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onReligionSelectorClicked = () => {
    dispatch(setPersonalInfo(state));
    navigate("/register/personalinfo/religion");
  };

  const onContinueClicked = () => {
    dispatch(setPersonalInfo(state));

    navigate("/register/education");
  };

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
        <div
          className="container px-4 pb-2 flex-grow-1 overflow-auto"
          //   ref={scrollContainerRef}
        >
          <h1>Personal Information</h1>
          <p className="text-muted mt-4">
            Name must match with government issued ID card
          </p>
          <div className="form-floating my-3 text-muted">
            <input
              type="text"
              name="full_name"
              id="inputRealName"
              value={state.full_name}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1 shadow-2"
              placeholder="realName"
              aria-describedby="realName"
            />
            <label htmlFor="inputRealName">Full Name</label>
          </div>
          <div className="d-flex my-4">
            {GENDER_TYPES.map((g, i) => (
              <button
                key={i}
                onClick={() => setState({...state, gender: g})}
                className={`btn btn-${
                  g === gender ? "" : "outline-"
                }primary w-100 rounded shadow p-3 my-2 ms-2 fw-semibold`}>
                {g}
              </button>
            ))}
          </div>
          <p className="text-muted mt-4">Enter Date of Birth</p>
          <div className="form-floating my-3 text-muted">
            <input
              type="date"
              name="date_of_birth"
              id="inputDateOfBirth"
              className="form-control border-0 rounded-1"
              // placeholder="name@example.com"
              aria-describedby="dateOfBirth"
              value={state.date_of_birth}
              //               {date_of_birth.toISOString().substring(0, 10)}
              onChange={handleUserInputChange}
            />
            <label htmlFor="inputDateOfBirth">Date of birth</label>
          </div>
          <p className="text-muted mt-4 mb-1">What's Candidate's height?</p>
          <div className="d-flex">
            <div className="form-floating my-3 text-muted me-2">
              <input
                type="number"
                id="inputHeightFeet"
                name="height_ft"
                value={state.height_ft}
                onChange={handleUserInputChange}
                className="form-control border-0 rounded-1"
                // placeholder={MIN_HEIGHT_FEET.toString()}
                aria-describedby="height_feet"
              />
              <label htmlFor="inputHeightFeet">ft</label>
            </div>
            <div className="form-floating my-3 text-muted ms-2">
              <input
                type="number"
                name="height_inc"
                id="inputHeightInches"
                value={state.height_inc}
                onChange={handleUserInputChange}
                className="form-control border-0 rounded-1"
                aria-describedby="height_inches"
              />
              <label htmlFor="inputHeightInches">in</label>
            </div>
          </div>
          <p className="text-muted mt-4">
            Select Candidate's weight (optional)
          </p>
          <div className="form-floating my-3 text-muted">
            <input
              type="number"
              id="inputWeight"
              name="weight"
              value={state.weight}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              aria-describedby="weight"
            />
            <label htmlFor="inputWeight">KG</label>
          </div>

          <p className="text-muted mt-4">Select Candidate's religion</p>
          <div onClick={onReligionSelectorClicked}>
            <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {religion}
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
          </div>
          <p className="text-muted mt-4">Select Candidate's marital status</p>
          <Link
            to={"/register/personalinfo/marital_status"}
            //   onClick={onEducationSelectorClicked}
          >
            <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {marital_status ?? "Select Marital Status"}
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
        <div className="container px-4 pb-4 pt-2">
          {err && <p className="text-primary">* {err}</p>}
          <button
            onClick={onContinueClicked}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1">
            <strong>Continue</strong>
          </button>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;
