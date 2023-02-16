import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RELIGION_TYPES} from "../../constants/register_constants";
import {setReligion} from "../../redux/slices/authSlices";
import {setPreferenceReligion} from "../../redux/slices/preferenceSlice";
import {stoteRegisterValues} from "../../utils/functions";

function Religions({module}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {religion: Religion} = useSelector((state) => state.auth);
  const {religion: preferenceReligion} = useSelector(
    (state) => state.preference
  );

  const [religion, set_religion] = useState(
    module === "preference" ? preferenceReligion : Religion
  );
  let onReligionChange = (e) => {
    set_religion(e.target.value);
    console.log("module", module);

    if (module == "preference") {
      dispatch(setPreferenceReligion(e.target.value));
      navigate(-1);

      return;
    }
    dispatch(setReligion(e.target.value));
    stoteRegisterValues({religion: e.target.value});

    navigate(-1);
  };
  // console.log(religion);

  return (
    <>
      <div className="vh-100 max-width-mobile mx-auto">
        <div className="container pt-4 px-4">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>
        </div>
        <div className="container px-4 pb-2 overflow-auto">
          <h1>Religion</h1>
          {RELIGION_TYPES.map((religionType, i) => (
            <div
              key={i}
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
              <div className="col-10">
                <label
                  htmlFor={religionType}
                  className="form-check-label bg-white w-100">
                  <strong>
                    {religionType
                      ? religionType
                      : module === "preference" && "None"}{" "}
                  </strong>
                </label>
              </div>

              <div className="col-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="religion_type"
                  checked={religion === religionType}
                  onChange={onReligionChange}
                  value={religionType}
                  id={religionType}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Religions;
