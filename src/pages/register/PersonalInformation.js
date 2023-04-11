import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";
import {GENDER_TYPES} from "../../constants/register_constants";
import {setPersonalInfo} from "../../redux/slices/authSlices";
import AuthServices from "../../services/authServices";
import {stoteRegisterValues, validateAge} from "../../utils/functions";
let scrollPos = 0;
function PersonalInformation() {
  const {
    full_name,
    date_of_birth,
    height_inches,
    height_feet,
    gender,
    display_name,
    weight,
    email,
    marital_status,
    religion,
  } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    full_name: full_name,
    display_name: display_name,
    date_of_birth: date_of_birth || "1995-01-01",
    height_ft: height_feet || "",
    height_inc: height_inches || "",
    weight: weight || "",
    gender: gender,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();
  const [ageError, setAgeError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  let {pathname} = useLocation();
  const scrollContainerRef = useRef();

  let socialToken = localStorage.getItem("social-token");

  const onEducationSelectorClicked = useCallback(() => {
    scrollPos = scrollContainerRef.current?.scrollTop;
  }, []);
  // const resetScroll = useCallback(() => {
  //   scrollPos = 0;
  // }, []);
  useEffect(() => {
    if (typeof scrollPos !== "undefined")
      scrollContainerRef.current?.scrollTo({top: scrollPos});
  }, [onEducationSelectorClicked]);

  console.log("date_of_birth", state.date_of_birth);

  const handleUserInputChange = (e) => {
    console.log("e.target.name", e.target.name);
    if (e.target.name === "height_ft") {
      if (e.target.value > 8 || e.target.value < 3) {
        setErr({
          error: "ft",
          message: "Height cannot be less than 3 feet or greater than 8 feet",
        });
        return;
      } else {
        setErr({});
      }
    }
    if (e.target.name === "height_inc") {
      if (e.target.value > 11 || e.target.value < 0) {
        setErr({
          error: "inc",
          message:
            "Height cannot be less than 0 inches or greater than 11 inches",
        });
        return;
      } else {
        setErr({});
      }
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // console.log('state', state)
  const onReligionSelectorClicked = () => {
    dispatch(setPersonalInfo(state));
    setErr({});
    onEducationSelectorClicked();

    navigate("/register/personalinfo/religion");
  };

  const onMaritalStatusClicked = () => {
    setErr({});
    dispatch(setPersonalInfo(state));
    onEducationSelectorClicked();

    navigate("/register/personalinfo/marital_status");
  };
  // console.log(state.gender);

  // function validateAge(dateOfBirth) {
  //   var today = new Date();
  //   var birthDate = new Date(dateOfBirth);
  //   var age = today.getFullYear() - birthDate.getFullYear();
  //   var month = today.getMonth() - birthDate.getMonth();
  //   if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
  //   }

  //   return age;
  // }

  const onContinueClicked = async () => {
    if (!state.full_name.trim() || state.full_name.trim().length < 6) {
      setErr({
        error: "name",
        message:
          "Full name is required and length should be minimum 6 characters",
      });
      return;
    } else if (
      !state.display_name.trim() ||
      state.display_name.trim().length < 3
    ) {
      setErr({
        error: "display_name",
        message:
          "Display name is required and length should be minimum 3 characters",
      });
      return;
    } else if (!state.gender) {
      setErr({
        error: "gender",
        message: "Please select male or female",
      });
      return;
    }
    if (!validateAge(state.date_of_birth, state?.gender)) {
      setErr({
        error: "dob",
        message:
          state?.gender.trim() === "Female".trim()
            ? "Your age must be 18 or 18 plus"
            : "Your age must be 21 or 21 plus",
      });
      return;
    }

    if (!state.height_ft || state.height_ft > 8 || state.height_ft < 3) {
      setErr({
        error: "ft",
        message: "Height cannot be less than 3 feet or greater than 8 feet",
      });
      return;
    } else if (
      !state.height_inc ||
      state.height_inc > 11 ||
      state.height_inc < 0
    ) {
      setErr({
        error: "inc",
        message:
          "Height cannot be less than 0 inches or greater than 11 inches",
      });
      return;
    }
    if ((state.weight && state.weight < 30) || state.weight >= 181) {
      setErr({
        error: "weight",
        message: "weight cannot be less than 30 kg or greater then 180 kg",
      });
      return;
    }
    if (!religion || religion === "Select  relligion") {
      setErr({
        error: "religion",
        message: "Please select Religion",
      });
      return;
    }
    if (!marital_status || marital_status === "Select marital status") {
      setErr({
        error: "marital_status",
        message: "Please select marital status",
      });
      return;
    }
    if (!state.date_of_birth?.trim()) {
      setErr({
        error: "date_of_birth",
        message: "Please select date of birth",
      });
      return;
    }
    if (!socialToken) {
      let data = {
        email: email,
        page_name: pathname,
      };
      setLoading(true);

      let res = await AuthServices.checkPage(data);
      // console.log('res', res)
      if (res.status === 200) {
        dispatch(setPersonalInfo(state));
        setLoading(false);

        stoteRegisterValues(state);
        navigate("/register/education");
      }
    } else if (socialToken) {
      dispatch(setPersonalInfo(state));
      stoteRegisterValues(state);
      setLoading(false);
      navigate("/register/education");
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <RegisterLayout
        err={err}
        onContinueClicked={onContinueClicked}
        loading={loading}>
        <div
          className="container px-4 pb-2 flex-grow-1 overflow-auto"
          ref={scrollContainerRef}>
          <h1 className="card-title">Bride/Groom Information</h1>

          <p className="text-muted mt-4" style={{fontFamily: "Inter"}}>
            Name must match with government issued ID card
          </p>

          <div
            className="form-floating my-3 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error === "name" ? "2px solid red" : "",
            }}>
            <input
              type="text"
              name="full_name"
              id="inputRealName"
              onFocus={() => setErr({})}
              style={{fontFamily: "Inter"}}
              value={state.full_name}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1 shadow-2"
              placeholder="realName"
              aria-describedby="realName"
            />
            <label htmlFor="inputRealName" style={{fontFamily: "Inter"}}>
              Full Name
              <span
                style={{
                  fontSize: `12px`,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}>
                (Not Visible to public)
              </span>
            </label>
          </div>
          <p className="text-muted mt-4" style={{fontFamily: "Inter"}}>
            App display name
          </p>
          <div
            className="form-floating my-3 text-muted rounded-1 "
            style={{
              fontFamily: "Inter",
              border: err?.error == "display_name" ? "2px solid red" : "",
            }}>
            <input
              type="text"
              name="display_name"
              id="inputRealName"
              onFocus={() => setErr({})}
              style={{fontFamily: "Inter"}}
              value={state.display_name}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1 shadow-2"
              placeholder="realName"
              aria-describedby="realName"
            />
            <label htmlFor="inputRealName" style={{fontFamily: "Inter"}}>
              Display Name
              <span
                style={{
                  fontSize: `12px`,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  // marginLeft: "30%"
                  marginLeft: "5px",
                }}>
                ( Visible to public)
              </span>
            </label>
          </div>
          <div className="d-flex my-4">
            {GENDER_TYPES.map((g, i) => (
              <button
                key={i}
                style={{fontFamily: "Inter", height: 60}}
                onClick={() => setState({...state, gender: g})}
                className={`btn btn-${
                  g === state.gender ? "" : "outline-"
                }primary w-100 rounded shadow p-3 my-2 ms-2 fw-semibold`}>
                {g}
              </button>
            ))}
          </div>
          <p className="text-muted mt-4" style={{fontFamily: "Inter"}}>
            Enter Date of Birth
          </p>
          <div
            className="form-floating my-3 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error === "dob" ? "2px solid red" : "",
            }}>
            <input
              type="date"
              style={{fontFamily: "Inter"}}
              name="date_of_birth"
              id="inputDateOfBirth"
              className="form-control border-0 rounded-1"
              onFocus={() => setErr({})}
              aria-describedby="dateOfBirth"
              value={state.date_of_birth}
              //               {date_of_birth.toISOString().substring(0, 10)}
              onChange={handleUserInputChange}
            />
            <label htmlFor="inputDateOfBirth" style={{fontFamily: "Inter"}}>
              Date of birth
            </label>
          </div>
          <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
            What's Candidate's height?
          </p>
          <div className="d-flex">
            <div
              className="form-floating my-3 text-muted rounded-1 me-2"
              style={{
                fontFamily: "Inter",
                border: err?.error == "ft" ? "2px solid red" : "",
              }}>
              <input
                type="number"
                id="inputHeightFeet"
                name="height_ft"
                style={{fontFamily: "Inter"}}
                value={state.height_ft}
                onFocus={() => setErr({})}
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
              className="form-floating my-3 rounded-1 text-muted ms-2 border-1"
              style={{
                fontFamily: "Inter",
                border: err?.error == "inc" ? "2px solid red" : "",
              }}>
              <input
                type="number"
                name="height_inc"
                id="inputHeightInches"
                style={{fontFamily: "Inter"}}
                value={state.height_inc}
                onFocus={() => setErr({})}
                onChange={handleUserInputChange}
                className="form-control border-0 rounded-1"
                aria-describedby="height_inches"
              />
              <label htmlFor="inputHeightInches" style={{fontFamily: "Inter"}}>
                in
              </label>
            </div>
          </div>
          <p className="text-muted mt-4" style={{fontFamily: "Inter"}}>
            Select Candidate's weight (optional)
          </p>
          <div
            className="form-floating my-3 text-muted rounded-1"
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
              value={state.weight}
              style={{fontFamily: "Inter"}}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              aria-describedby="weight"
            />
            <label htmlFor="inputWeight" style={{fontFamily: "Inter"}}>
              KG
            </label>
          </div>

          <p className="text-muted mt-4" style={{fontFamily: "Inter"}}>
            Select Candidate's religion
          </p>
          <div onClick={onReligionSelectorClicked}>
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
                  {religion ? religion : "Select  religion"}
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
          <p className="text-muted mt-4" style={{fontFamily: "Inter"}}>
            Select Candidate's marital status
          </p>
          <div onClick={onMaritalStatusClicked}>
            <div
              className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
              style={{
                fontFamily: "Inter",
                border: err?.error == "marital_status" ? "2px solid red" : "",
              }}>
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
          </div>
        </div>
        {/* <div className="container px-4 pb-4 pt-2">
          {err?.error && <p className="text-primary">* {err?.message}</p>}
          <button
            onClick={onContinueClicked}
            style={{height: 60}}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1">
            <strong style={{fontFamily: "Inter"}}>Continue</strong>
          </button>
        </div> */}
      </RegisterLayout>
    </>
  );
}

export default PersonalInformation;
