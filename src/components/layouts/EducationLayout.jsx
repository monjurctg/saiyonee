import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setEditProfile } from "../../redux/slices/editProfileslice";

function EducationLayout({
  title,
  children,
  label,
  to,
  inputChange,
  onEducationSelectorClicked,
  err,
  type,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <p className="text-muted text-start mt-4" style={{ fontFamily: "Inter" }}>
        {title} Type
      </p>
      <div className="form-floating text-muted rounded-1">
        <div
          //   onClick={() => dispatch(setEditProfile(inputChange))}
          onClick={onEducationSelectorClicked}
          // to={to}
        >
          <div
            className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
            style={{
              fontFamily: "Inter",
              border: err?.error == type ? "2px solid red" : "",
            }}
          >
            <div className="col-10">
              <label className="form-check-label bg-white px-2 text-body">
                {label ?label: ` ${title} Type`}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </div>
        {/* 
      <label style={{fontFamily: "Inter"}} htmlFor="">
        Secondary Education Type
      </label> */}

        {children}
      </div>
    </>
  );
}

export default EducationLayout;
