import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";
import {
  setGender,
  setHeight,
  setpreferenceQuestion,
} from "../../redux/slices/preferenceSlice";
import PreferenceServices from "../../services/preferenceServices";
let scrollPos = 0;

function Preference() {
  const [err, seterr] = useState(false);
  const {
    religion: preferenceReligion,
    employType,
    dynamicQuestion,
    maritalStatus,
    dynamicQuesAns,
    height_inches,
    height_feet,
    age_form,
    age_to,
    gender,
    country,
    city,
  } = useSelector((state) => state.preference);
  // const [form_filter_ids, setForm_filter] = useState({});

  const [extraQuestion, setextraQuestion] = useState([]);

  const [state, setState] = useState({
    age_form: age_form,
    age_to: age_to,
    height_feet: height_feet,
    height_inches: height_inches,
    gender: gender,
  });

  const handleUserInputChange = (e) => {
    console.log("e.target.value", e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();

  const fetchFilterQuestion = async () => {
    const res = await PreferenceServices.getFilterQuestion();
    if (res.status === 200) {
      dispatch(setpreferenceQuestion(res.data.filters));
    }
    // console.log(res, "profile preference res");
  };

  const scrollContainerRef = useRef();

  const onSelectClicked = useCallback(() => {
    dispatch(setHeight(state));
    scrollPos = scrollContainerRef.current?.scrollTop;
  }, []);
  const resetScroll = useCallback(() => {
    scrollPos = 0;
  }, []);
  useEffect(() => {
    if (typeof scrollPos !== "undefined")
      scrollContainerRef.current?.scrollTo({top: scrollPos});
  }, [onSelectClicked]);

  useEffect(() => {
    fetchFilterQuestion();
  }, []);
  // console.log(extraQuestion);
  // console.log(Set(data));

  const onContinueClicked = async () => {
    let formd = new FormData();

    let data = {
      gender,
      age_form,
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

    country.length > 0 && formd.append("current_country[]", [...country]);
    const res = await PreferenceServices.postPreference(formd);
    console.log(res, "res");
  };

  let preferenceData = (
    <>
      <h2 className="mb-2">Set your preference</h2>
      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Gender
      </p>
      <div className="d-flex my-4">
        <button
          onClick={() => dispatch(setGender("Female"))}
          style={{fontFamily: "Inter", height: 60, width: 107}}
          // onClick={() => setState({...state, gender: g})}
          className={`btn btn-mal outline-
    primary w-100 rounded shadow p-2 my-2 ms-2 fw-semibold`}>
          {/* {g} */}
          Male
        </button>
        <button
          // key={i}
          onClick={() => dispatch(setGender("Female"))}
          style={{fontFamily: "Inter", height: 60, width: 107}}
          // onClick={() => setState({...state, gender: g})}
          className={`btn btn-mal outline-
  primary w-100 rounded shadow p-2 my-2 ms-2 fw-semibold fw-semibold`}>
          {/* {g} */}
          Female
        </button>
      </div>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Age
      </p>
      <div className="d-flex">
        <div className="form-floating my-3 text-muted me-2">
          <input
            type="number"
            id="inputHeightFeet"
            name="age_to"
            style={{fontFamily: "Inter"}}
            // value={state.height_ft}
            // onChange={handleUserInputChange}
            className="form-control border-0 rounded-1"
            placeholder={"To"}
            aria-describedby="height_feet"
          />
          <label htmlFor="inputHeightFeet" style={{fontFamily: "Inter"}}>
            To
          </label>
        </div>
        <div className="form-floating my-3 text-muted ms-2">
          <input
            type="number"
            name="age_form"
            id="inputHeightInches"
            style={{fontFamily: "Inter"}}
            // value={state.height_inc}
            // onChange={handleUserInputChange}
            placeholder={"Form"}
            className="form-control border-0 rounded-1"
            aria-describedby="height_inches"
          />
          <label htmlFor="inputHeightInches" style={{fontFamily: "Inter"}}>
            Form
          </label>
        </div>
      </div>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select religion
      </p>
      <div>
        <Link onClick={onSelectClicked} to={"/preference/religion"}>
          <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
            <div className="col-10">
              <label
                className="form-check-label  bg-white px-2 text-body"
                style={{fontFamily: "Inter", cursor: "pointer"}}>
                {/* {religion} */}
                {preferenceReligion}
              </label>
            </div>

            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </Link>
      </div>
      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select employment type
      </p>
      <div>
        <Link onClick={onSelectClicked} to="/preference/employ">
          <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
            <div className="col-10">
              <label
                className="form-check-label bg-white px-2 text-body"
                style={{fontFamily: "Inter"}}>
                {/* {religion} */}
                {employType}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </Link>
      </div>
      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select marital status
      </p>
      <div>
        <Link to="/preference/marital_status">
          <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
            <div className="col-10">
              <label
                className="form-check-label bg-white px-2 text-body"
                style={{fontFamily: "Inter"}}>
                {/* {religion} */}
                {maritalStatus}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </Link>
      </div>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select Current Country
      </p>
      <div>
        <Link onClick={onSelectClicked} to="/preference/country">
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
      </div>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select Current City
      </p>
      <div>
        <Link onClick={onSelectClicked} to="/preference/city">
          <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
            <div className="col-10">
              <label
                className="form-check-label bg-white px-2 text-body"
                style={{fontFamily: "Inter"}}>
                {city ?? "Select Current City"}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </Link>
      </div>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Minimum height
      </p>
      <div className="d-flex">
        <div className="form-floating my-3 text-muted me-2">
          <input
            type="number"
            id="inputHeightFeet"
            name="height_feet"
            style={{fontFamily: "Inter"}}
            value={state.height_feet}
            onChange={handleUserInputChange}
            className="form-control border-0 rounded-1"
            // placeholder={MIN_HEIGHT_FEET.toString()}
            aria-describedby="height_feet"
          />
          <label htmlFor="inputHeightFeet" style={{fontFamily: "Inter"}}>
            ft
          </label>
        </div>
        <div className="form-floating my-3 text-muted ms-2">
          <input
            type="number"
            name="height_inches"
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
    </>
  );

  const subData = "";

  return (
    <>
      <RegisterLayout onContinueClicked={onContinueClicked}>
        <div
          className="container px-4 pb-2 flex-grow-1  overflow-auto"
          ref={scrollContainerRef}>
          {/* <h1> </h1> */}
          {preferenceData}
          {dynamicQuestion.map((question, index) => (
            <div key={index}>
              <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
                {question.title}
              </p>
              <div>
                <Link to={`/preference/dynamic-${question.id}`}>
                  <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
                    <div className="col-10">
                      <label
                        className="form-check-label  bg-white px-2 text-body"
                        style={{fontFamily: "Inter", cursor: "pointer"}}>
                        {/* {religion} */}
                        {question.label}
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
            </div>
          ))}
        </div>
      </RegisterLayout>
    </>
  );
}

export default Preference;
