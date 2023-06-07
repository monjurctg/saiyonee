import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function InputLayOut({
  children,
  err,
  onContinueClicked,
  length,
  title,
  loading,
  from,
  backNavigate,
  ref
}) {
  let { pathname } = useLocation();
  //console.log(from, "from");

  const navigate = useNavigate();
  return (
    <div
      className="vh-100 d-flex flex-column max-width-mobile mx-auto "
      style={{
        background: "#F9FAFB",
        borderRadius: 35,
        // height: "100vh",

        // "#F9FAFB"
      }}
    >
      <div className=" d-flex flex-column max-width-mobile mx-auto vh-100">
        <div className="container">
          <div
            onClick={() => navigate(backNavigate?backNavigate:-1)}
            className="btn btn-primary rounded-circle shadow p-3 mb-2 image-invert"
            style={{ height: "58px", width: "58px" }}
          >
            <img src="/img/back-icon.svg" alt="back" />
          </div>
        </div>
        <h1 className="container px-4">{title}</h1>

        

          {children}
      
        <div
          className="container px-4  mx-auto max-width-mobile  "
          style={{ position: "fixed", bottom: 0 }}
        >
          {err?.message && (
            <p
              className="text-primary"
              style={{ backgroundColor: "#FFFFFFFF",minHeight:50,alignSelf:"center" }}
            >
              * {err?.message}
            </p>
          )}
          {from === "gallery" || from === "editGallery" ? (
            <div></div>
          ) : (
            <button
              style={{ height: 60 }}
              onClick={onContinueClicked}
              className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1"
            >
              <strong>Save</strong>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputLayOut;
