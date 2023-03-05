import React from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

function InputLayOut({
  children,
  err,
  onContinueClicked,
  length,
  title,
  loading,
  from,
}) {
  let {pathname} = useLocation();
  console.log(from, "from");

  const navigate = useNavigate();
  return (
    <div
      className="mx-auto max-width-mobile pt-4 "
      style={{
        background: "#F9FAFB",
        borderRadius: 35,
        height: "100vh",

        // "#F9FAFB"
      }}>
      <div className=" d-flex flex-column max-width-mobile mx-auto">
        <div className="container">
          <div
            onClick={() => navigate(-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-2 image-invert"
            style={{height: "58px", width: "58px"}}>
            <img src="/img/back-icon.svg" alt="back" />
          </div>
        </div>

        <div
          className="container px-4 pb-2 flex-grow-1 overflow-auto"
          style={{
            height: "100vh",
          }}>
          <h1>{title}</h1>

          {children}
        </div>

        <div className="container px-4 pt-2 position-abs">
          {err && <p className="text-primary">* {err}</p>}
          {from !== "gellary" && (
            <button
              style={{height: 60}}
              onClick={onContinueClicked}
              className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1">
              <strong>Save</strong>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputLayOut;
