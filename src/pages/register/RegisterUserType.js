import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {USER_TYPES} from "../../constants/register_constants";
import {setGender, setUserType} from "../../redux/slices/authSlices";
import {stoteRegisterValues} from "../../utils/functions";

function RegisterUserType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user_type: userType} = useSelector((state) => state.auth);
  const [err, setErr] = useState("");
  const [user_type, set_user_type] = useState(userType);
  const onTypeChange = (e) => {
    set_user_type(e.target.value);
  };
  const onClickNext = () => {
    if (!user_type) {
      setErr("Please Select a user type");
      return;
    }
    dispatch(setUserType(user_type));
    stoteRegisterValues({user_type: user_type});
    navigate("/register/personal-info");
  };
  return (
    <>
      <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
        <div className="container px-4">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>
        </div>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1
            style={{
              fontFamily: "Inter",
            }}>
            I'm searching life partner for
          </h1>
          {USER_TYPES.map((userType, i) => (
            <div
              key={i}
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1">
              <div className="col-10">
                <label
                  htmlFor={userType}
                  className="form-check-label bg-white w-100">
                  <strong>{userType}</strong>
                </label>
              </div>
              <div className="col-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="user_type"
                  style={{
                    fontFamily: "Inter",
                  }}
                  checked={user_type === userType}
                  onChange={onTypeChange}
                  value={userType}
                  id={userType}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="container px-4 pb-4 pt-2">
          {err && <p className="text-primary">* {err}</p>}
          <div
            style={{height: 60, fontFamily: "Inter"}}
            onClick={onClickNext}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-3">
            <strong>Next</strong>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterUserType;
