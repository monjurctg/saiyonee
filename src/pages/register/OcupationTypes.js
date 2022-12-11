import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {OCCUPATION_TYPES} from "../../constants/register_constants";
import {setCurrentEmploymentTypeOther, setCurrentEmplyType} from "../../redux/slices/authSlices";
import {setEmployType} from "../../redux/slices/preferenceSlice";
import {stoteRegisterValues} from "../../utils/functions";

function OcupationTypes({module}) {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {current_employment_type} = useSelector((state) => state.auth);
  const {employType: preferenceEmploytype} = useSelector(
    (state) => state.preference
  );
  const [employType, set_employType] = useState(
    module === "employ" ? preferenceEmploytype : current_employment_type
  );

  const onOccupationChange = (e) => {
    set_employType(e.target.value);
    if (module === "employ") {
      dispatch(setEmployType(e.target.value));
      navigator(-1);
      return;
    }
    if (e.target.value === "Other") {
      dispatch(setCurrentEmploymentTypeOther(true));
      dispatch(setCurrentEmplyType(""));

      // stoteRegisterValues({current_employment_type: "Other"});
    } else {
      dispatch(setCurrentEmploymentTypeOther(false));
      dispatch(setCurrentEmplyType(e.target.value));
      stoteRegisterValues({current_employment_type: e.target.value});
    }
    navigator(-1);
  };
  return (
    <>
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
          <h1>Current Employment type</h1>
          {/* <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
            <div className="col-10">
              <label htmlFor="None" className="form-check-label bg-white w-100">
                <strong>Select employment type</strong>
              </label>
            </div>
            <div className="col-2">
              <input
                className="form-check-input"
                type="radio"
                name="occupation_type"
                checked={!current_employment_type}
                onChange={onOccupationChange}
                value={undefined}
                id="None"
              />
            </div>
          </div> */}
          {OCCUPATION_TYPES.map((occupationType, i) => (
            <div
              key={i}
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
              <div className="col-10">
                <label
                  htmlFor={occupationType}
                  className="form-check-label bg-white w-100">
                  <strong>{occupationType}</strong>
                </label>
              </div>
              <div className="col-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="occupation_type"
                  checked={employType === occupationType}
                  onChange={onOccupationChange}
                  value={occupationType}
                  id={occupationType}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OcupationTypes;
