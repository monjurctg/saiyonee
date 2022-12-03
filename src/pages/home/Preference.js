import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";
import PreferenceServices from "../../services/preferenceServices";

function Preference() {
  const [err, seterr] = useState(false);
  const {religion: preferenceReligion} = useSelector(
    (state) => state.preference
  );
  const [extraQuestion, setextraQuestion] = useState(null);

  const fetchFilterQuestion = async () => {
    const res = await PreferenceServices.getFilterQuestion();
    if (res.status === 200) {
      setextraQuestion(res.data.filters);
    }
    console.log(res, "profile preference res");
  };

  useEffect(() => {
    fetchFilterQuestion();
  }, []);

  let preferenceData = (
    <>
      <h2 className="mb-2">Set your preference</h2>
      <p>Gender</p>
      <div className="d-flex my-4">
        <button
          // key={i}
          style={{fontFamily: "Inter", height: 48, width: 107}}
          // onClick={() => setState({...state, gender: g})}
          className={`btn btn-mal outline-
    primary w-100 rounded shadow p-2 my-2 ms-2 fw-semibold`}>
          {/* {g} */}
          male
        </button>
        <button
          // key={i}
          style={{fontFamily: "Inter", height: 48, width: 107}}
          // onClick={() => setState({...state, gender: g})}
          className={`btn btn-mal outline-
  primary w-100 rounded shadow p-2 my-2 ms-2 fw-semibold fw-semibold`}>
          {/* {g} */}
          male
        </button>
      </div>
      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select religion
      </p>
      <div>
        <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
          <div className="col-10">
            <Link to={"/preference/religion"}>
              <label
                className="form-check-label  bg-white px-2 text-body"
                style={{fontFamily: "Inter", cursor: "pointer"}}>
                {/* {religion} */}
                {preferenceReligion}
              </label>
            </Link>
          </div>

          <div className="col-2 d-flex justify-content-end pe-3">
            <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
          </div>
        </div>
      </div>
      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select employment type
      </p>
      <div>
        <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
          <div className="col-10">
            <label
              className="form-check-label bg-white px-2 text-body"
              style={{fontFamily: "Inter"}}>
              {/* {religion} */}
              Select employment type
            </label>
          </div>
          <div className="col-2 d-flex justify-content-end pe-3">
            <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
          </div>
        </div>
      </div>
      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Select marital status
      </p>
      <div>
        <div className="row my-3 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
          <div className="col-10">
            <label
              className="form-check-label bg-white px-2 text-body"
              style={{fontFamily: "Inter"}}>
              {/* {religion} */}
              Select marital status
            </label>
          </div>
          <div className="col-2 d-flex justify-content-end pe-3">
            <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
          </div>
        </div>
      </div>

      <p className="text-muted mt-4 mb-1" style={{fontFamily: "Inter"}}>
        Minimum height
      </p>
      <div className="d-flex">
        <div className="form-floating my-3 text-muted me-2">
          <input
            type="number"
            id="inputHeightFeet"
            name="height_ft"
            style={{fontFamily: "Inter"}}
            // value={state.height_ft}
            // onChange={handleUserInputChange}
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
            name="height_inc"
            id="inputHeightInches"
            style={{fontFamily: "Inter"}}
            // value={state.height_inc}
            // onChange={handleUserInputChange}
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
      <RegisterLayout>
        <div
          className="container px-4 pb-2 flex-grow-1  overflow-auto"
          // ref={scrollContainerRef}
        >
          {/* <h1> </h1> */}
          {preferenceData}
        </div>
      </RegisterLayout>
    </>
  );
}

export default Preference;
