import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MARITAL_STATUS_TYPES} from "../../constants/register_constants";
import {setMaritalStatus} from "../../redux/slices/authSlices";
import {setEditMaritalStatus} from "../../redux/slices/editProfileslice";
import {setMaridStatus} from "../../redux/slices/preferenceSlice";
import {stoteRegisterValues} from "../../utils/functions";

function MaritalStatus({module}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {marital_status: maritalStatus} = useSelector((state) => state.auth);
  const {maritalStatus: preferenceMaritalStatus} = useSelector(
    (state) => state.preference
  );
  const {marital_status: edit_marital_status} = useSelector(
    (state) => state.editProfile
  );

  const [marital_status, setMarital_status] = useState(
    module === "marital_status" ? preferenceMaritalStatus : maritalStatus
  );
  let onMaritalStatusChange = (e) => {
    if (module === "marital_status_edit") {
      dispatch(setEditMaritalStatus(e.target.value));
      navigate(-1);
      return;
    }
    if (module === "marital_status") {
      dispatch(setMaridStatus(e.target.value));
      navigate(-1);

      return;
    }

    if (e.target.name === "select_marital") {
      setMarital_status("Select marital status");

      dispatch(setMaritalStatus("Select marital status"));
      navigate(-1);
      return;
    }
    setMarital_status(e.target.value);
    dispatch(setMaritalStatus(e.target.value));
    stoteRegisterValues({marital_status: e.target.value});

    navigate(-1);
  };
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
          <h1 className="card-title">Marital status</h1>
          {/* <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
            <div className="col-10">
              <label htmlFor="None" className="form-check-label bg-white w-100">
                <strong>Select marital status</strong>
              </label>
            </div>
            <div className="col-2">
              <input
                className="form-check-input"
                type="radio"
                name="select_marital"
                checked={marital_status === "Select marital status"}
                onChange={onMaritalStatusChange}
                value={marital_status}
                id="None"
              />
            </div>
          </div> */}

          {MARITAL_STATUS_TYPES.map((maritalStatusType, i) => (
            <div
              key={i}
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
              <div className="col-10">
                <label
                  htmlFor={maritalStatusType}
                  className="form-check-label bg-white w-100">
                  <strong>
                    {maritalStatusType ? maritalStatusType : "None"}
                  </strong>
                </label>
              </div>
              <div className="col-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="marital_status_type"
                  checked={
                    module === "marital_status_edit"
                      ? edit_marital_status === maritalStatusType
                      : marital_status === maritalStatusType
                  }
                  onChange={onMaritalStatusChange}
                  value={maritalStatusType}
                  id={maritalStatusType}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MaritalStatus;
