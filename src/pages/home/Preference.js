import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";
import {
  setGender,
  setHeight,
  setMaridStatus,
  setpreferenceQuestion,
  setPreviousPreference,
} from "../../redux/slices/preferenceSlice";
import PreferenceServices from "../../services/preferenceServices";
import toastMsg from "../../utils/toastify";
let scrollPos = 0;

function Preference() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [previousPreference, setPreviousPreference] = useState({});
  const {
    religion: preferenceReligion,
    employType,
    dynamicQuestion,
    maritalStatus,
    dynamicQuesAns,
    height_inches,
    height_feet,
    age_from,
    age_to,
    gender,
    country,
  } = useSelector((state) => state.preference);
  const [state, setState] = useState({
    age_from: age_from,
    age_to: age_to,
    height_feet: height_feet,
    height_inches: height_inches,
    gender: gender,
    religion: preferenceReligion,
    maritalStatus: maritalStatus,
    country: country,
    employType: employType,
  });
  //console.log(state, "state");

  const navigate = useNavigate();
  const location = useLocation();

  const handleUserInputChange = (e) => {
    
    
   
    if (e.target.name === "age_to" && state?.age_from &&  state?.age_from > e.target.value) {
      setErr({
        error: "age_to",
        message: "To can not be smaller than From",
      });
    } 
    if (e.target.name === "age_from" && state?.age_to && state?.age_to < e.target.value) {
      setErr({
        error: "age_from",
        message: "From can not be bigger than To",
      });
    } 
    
    // else if (
    //   e.target.name === "age_from" &&
    //   (e.target.value > 255 || e.target.value < 19)
    // ) {
    //   setErr({
    //     error: "age_from",
    //     message: "age from cannot be less than 19 year or greater than 255 year",
    //   });
    //   // return;
    // } else if (
    //   e.target.name === "age_to" &&
    //   (e.target.value > 255 || e.target.value < 19)
    // ) {
    //   setErr({
    //     error: "age_to",
    //     message: "age to cannot be less than 19 year or greater than 255 year",
    //   });
    //   // return;
    // }
    
    
    else if (
      e.target.name === "height_feet" &&
      (e.target.value > 8 || e.target.value <= 2)
    ) {
      //console.log("height problem");
      setErr({
        error: "ft",
        message: "Height cannot be less than 3 feet or greater than 8 feet",
      });
      // return;
    } else if (
      e.target.name === "height_inches" &&
      (e.target.value < 0 || e.target.value > 11)
    ) {
      setErr({
        error: "inc",
        message:
          "Height cannot be less than 0 inches or greater than 11 inches",
      });
      // return;
    } else {
      setErr({});
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const fetchFilterQuestion = async () => {
    const res = await PreferenceServices.getFilterQuestion();
    if (res.status === 200) {
      // dispatch(setpreferenceQuestion(res.data.filters));
    } else {
    }
    //console.log(res, "profile preference res");
  };

  const scrollContainerRef = useRef();

  const onSelectClicked = useCallback(() => {
    scrollPos = scrollContainerRef.current?.scrollTop;
  }, []);
  const resetScroll = useCallback(() => {
    scrollPos = 0;
  }, []);

  useEffect(() => {
    if (typeof scrollPos !== "undefined")
      scrollContainerRef.current?.scrollTo({top: scrollPos});
  }, [onSelectClicked]);

  const clickButton = (path) => {
    navigate(path)
    dispatch(setHeight(state));
    dispatch(setMaridStatus(maritalStatus ? maritalStatus : " "));
    onSelectClicked();
  };

  const onContinueClicked = async () => {
    //console.log(maritalStatus);
    if (state.age_from && state.age_to && state.age_from > state.age_to) {
      setErr({
        error: "age_to",
        message: "To can not be smaller than From",
      });
      return;
    }
    if (state.age_to && state.age_from && state.age_to < state.age_from) {
      setErr({
        error: "age_from",
        message: "From can not be bigger than To",
      });
      return;
    }
    if (state.age_from && (state.age_from > 255 || state.age_from < 18)) {
      setErr({
        error: "age_from",
        message: "age rom cannot be less than 19 year or greater than 255 year",
      });
      return;
    }
    if (state.age_to && (state.age_to > 255 || state.age_to < 18)) {
      setErr({
        error: "age_to",
        message: "age to cannot be less than 19 year or greater than 255 year",
      });
      return;
    } else if (
      state.height_feet &&
      (state.height_feet > 8 || state.height_feet <= 2)
    ) {
      setErr({
        error: "ft",
        message: "Height cannot be less than 3 feet or greater than 8 feet",
      });
      return;
    } else if (
      state.height_inches &&
      (state.height_inches < 0 || state.height_inches > 11)
    ) {
      //console.log(state.height_inches, "incs");
      setErr({
        error: "inc",
        message:
          "Height cannot be less than 0 inches or greater than 11 inches",
      });
      return;
    }
    // if (state.age_from > state.age_to) {
    //   setErr({
    //     error: "age_to",
    //     message: "To can not be smaller than From",
    //   });
    //   return;
    // }
    // if (state.age_to < state.age_from ) {
    //   setErr({
    //     error: "age_from",
    //     message: "From can not be bigger than To",
    //   });
    //   return;
    // }
    // else if () {

    // }
    // else if () {

    // }
    dispatch(setHeight(state));

    let formd = new FormData();

    let data = {
      gender,
      age_from: age_from,
      age_to,
      height_feet,
      height_inches,
      religion: preferenceReligion,
      marital_status: maritalStatus,
      current_employment_type: employType,
    };
    Object.keys(data).map((key) => {
      formd.append(key, data[key]);
    });
    if (dynamicQuesAns.length > 0) {
      dynamicQuesAns.map((qa) => {
        formd.append("form_filter_ids[]", [qa]);
      });
    }

    // country.length > 0 && formd.append("current_country[]", [...country]);
    const res = await PreferenceServices.postPreference(formd);
    if (res.status === 200) {
      toastMsg.success("Preference set successfully");
      localStorage.setItem("preference", true);
      navigate("/home");
    } else {
      //console.log(Object.values(res?.data.errors)[0][0], "error from preferce");
      toastMsg.error(Object.values(res?.data.errors)[0][0]);
    }
    //console.log(res, "res");
  };
  // const [form_filter_ids, setForm_filter] = useState({});

  useEffect(() => {
    if (!age_to) {
      fetchFilterQuestion();
      // fetchPreviousPreference();
    }
  }, []);

  useEffect(() => {
    if (age_to) {
      setState({
        ...state,
        age_to: age_to,
        age_from: age_from,
        height_feet: height_feet,
        height_inches: height_inches,
      });
    }
  }, [age_to, age_from]);

  let preferenceData = (
    <>
      <h2 className="mb-2">Set your preference</h2>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Age
      </p>
      <div className="d-flex">
        <div
          className="form-floating my-3 text-muted me-2 rounded-1"
          style={{
            fontFamily: "Inter",
            border: err?.error === "age_from" ? "2px solid red" : "",
          }}>
          <input
            type="number"
            id="inputHeightFeet"
            name="age_from"
            style={{fontFamily: "Inter"}}
            value={state.age_from}
            onChange={handleUserInputChange}
            placeholder={"From"}
            min={19}
            onFocus={() => setErr({})}
            className="form-control border-0 rounded-1"
            aria-describedby="height_inches"
          />
          <label htmlFor="inputHeightInches" style={{fontFamily: "Inter"}}>
            From
          </label>
        </div>
        <div
          className="form-floating my-3 text-muted me-2 rounded-1"
          style={{
            fontFamily: "Inter",
            border: err?.error === "age_to" ? "2px solid red" : "",
          }}>
             <input
            type="number"
            id="inputHeightFeet"
            name="age_to"
            style={{fontFamily: "Inter"}}
            value={state.age_to}
            onChange={handleUserInputChange}
            placeholder={"To"}
            // min={19}
            onFocus={() => setErr({})}
            className="form-control border-0 rounded-1"
            // aria-describedby="height_inches"
          />
          {/* <input
            type="number"
            id="inputHeightFeet"
            min={19}
            name="age_to"
            onFocus={() => setErr({})}
            style={{fontFamily: "Inter"}}
            value={state.age_to}
            onChange={handleUserInputChange}
            className="form-control border-0 rounded-1"
            placeholder={"To"}
            aria-describedby="height_feet"
          /> */}
          <label htmlFor="inputHeightFeet" style={{fontFamily: "Inter"}}>
            To
          </label>
        </div>
      </div>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Minimum height
      </p>
      <div className="d-flex">
        <div
          className="form-floating my-3 text-muted me-2 rounded-1"
          style={{
            fontFamily: "Inter",
            border: err?.error === "ft" ? "2px solid red" : "",
          }}>
          <input
            type="number"
            id="inputHeightFeet"
            name="height_feet"
            min={3}
            onFocus={() => setErr({})}
            style={{fontFamily: "Inter"}}
            value={state?.height_feet}
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
          className="form-floating my-3 text-muted ms-2 rounded-1"
          style={{
            fontFamily: "Inter",
            border: err?.error === "inc" ? "2px solid red" : "",
          }}>
          <input
            type="number"
            name="height_inches"
            min={0}
            onFocus={() => setErr({})}
            id="inputHeightInches"
            style={{fontFamily: "Inter"}}
            value={state.height_inches}
            onChange={handleUserInputChange}
            className="form-control border-0 rounded-1"
            aria-describedby="height_inches"
          />
          <label htmlFor="inputHeightInches" style={{fontFamily: "Inter"}}>
            in
          </label>
        </div>
      </div>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select religion
      </p>
      <div>
        <div onClick={()=>clickButton("/preference/religion")} >
          <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
            <div className="col-10">
              <label
                className="form-check-label  bg-white px-2 text-body"
                style={{fontFamily: "Inter", cursor: "pointer"}}>
                {/* {religion} */}
                {state.religion?.trim() ||
                  preferenceReligion?.trim() ||
                  "Select religion"}
              </label>
            </div>

            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </div>
      </div>
      {/* <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select employment type
      </p> */}
      {/* <div>
        <Link onClick={clickButton} to="/preference/employ">
          <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
            <div className="col-10">
              <label
                className="form-check-label bg-white px-2 text-body"
                style={{fontFamily: "Inter"}}>
                {religion} 
                {state.employType || employType || "Select employment type"}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </Link>
      </div> */}
      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select marital status
      </p>
      <div>
        <div onClick={()=>clickButton("/preference/marital_status")}>
          <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
            <div className="col-10">
              <label
                className="form-check-label bg-white px-2 text-body"
                style={{fontFamily: "Inter"}}>
                {/* {religion} */}
                {state?.maritalStatus?.trim() ||
                  maritalStatus?.trim() ||
                  "Select marital status"}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </div>
      </div>

      {/* <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select Current Country
      </p>
      <div>
        <Link onClick={clickButton} to="/preference/country">
          <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
            <div className="col-10">
              <label
                className="form-check-label bg-white px-2 text-body"
                style={{fontFamily: "Inter"}}>
                {country[0] ?? "Select Current Country"}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </Link>
      </div> */}
    </>
  );

  const subData = "";

  return (
    <>
      <RegisterLayout
        onContinueClicked={onContinueClicked}
        onFocus={() => dispatch(setHeight(state))}
        helpN={true}
        err={err}>
        <div
          className="container px-4 pb-2 flex-grow-1  overflow-auto"
          ref={scrollContainerRef}>
          {/* <h1> </h1> */}

          {loading ? <h1>Loading ...</h1> : preferenceData}
          {dynamicQuestion.map((question, index) => (
            <div key={index}>
              <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
                {question.label}
              </p>
              <div>
                <div
                  onClick={()=>clickButton(`/preference/dynamic-${question.id}`)}
                  >
                  <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
                    <div className="col-10">
                      <label
                        className="form-check-label  bg-white px-2 text-body"
                        style={{fontFamily: "Inter", cursor: "pointer"}}>
                        {/* {religion} */}
                        {question.filter_display_name}
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
            </div>
          ))}
        </div>
      </RegisterLayout>
    </>
  );
}

export default Preference;
