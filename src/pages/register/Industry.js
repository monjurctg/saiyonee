import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {INDUSTRY_TYPES} from "../../constants/register_constants";
import {setIndustry} from "../../redux/slices/authSlices";
import {stoteRegisterValues} from "../../utils/functions";

function Industry() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {industry} = useSelector((state) => state.auth);
  const onIndustryChange = (e) => {
    dispatch(setIndustry(e.target.value));
    stoteRegisterValues({
      industry: e.target.value,
    });

    navigator(-1);
  };

  return (
    <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
      <div className="container pt-4 px-4">
        <div
          onClick={() => navigator(-1)}
          className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
          style={{height: "58px", width: "58px"}}>
          <img src="/img/back-icon.svg" alt="back" />
        </div>
      </div>
      <div className="container px-4 pb-2 overflow-auto">
        <h1>Current Industry</h1>
        {/* <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
          <div className="col-10">
            <label htmlFor="None" className="form-check-label bg-white w-100">
              <strong>Select industry</strong>
            </label>
          </div>
          <div className="col-2">
            <input
              className="form-check-input"
              type="radio"
              name="industry_type"
              checked={!industry}
              onChange={onIndustryChange}
              value={undefined}
              id="None"
            />
          </div>
        </div> */}
        {INDUSTRY_TYPES.map((ind, i) => (
          <div
            key={i}
            className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
            <div className="col-10">
              <label htmlFor={ind} className="form-check-label bg-white w-100">
                <strong>{ind ? ind : "None"}</strong>
              </label>
            </div>
            <div className="col-2">
              <input
                className="form-check-input"
                type="radio"
                name="industry_type"
                checked={industry === ind}
                onChange={onIndustryChange}
                value={ind ?? ""}
                id={ind}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Industry;
