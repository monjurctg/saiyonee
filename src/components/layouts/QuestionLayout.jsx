import React from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Loader from "../Loader";

function QuestionLayout({
  children,
  err,
  onContinueClicked,
  length,
  title,
  loading,
  imageClick,
  skipBtn,
}) {
  // console.log("length", length);
  // let { id } = useParams();
  let {pathname} = useLocation();
  const handleSkip = () => {
    const isPreference = localStorage.getItem("preference");
    if (isPreference === "true") {
      navigate("/home");
    } else {
      navigate("/preference");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
      <div className="container px-4 pt-4">
        <div
          onClick={() => navigate(-1)}
          className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
          style={{height: "58px", width: "58px"}}>
          <img src="/img/back-icon.svg" alt="back" />
        </div>
      </div>
      {/* {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      )} */}
      <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
        <h1 className="card-title">{title}</h1>

        {children}
      </div>

      <div className="container px-4 pb-4 pt-2">
        {err && <p className="text-primary">* {err}</p>}

        {/* <Link to={} > */}
        {pathname !== "/question/selfie-verification" ? (
          <button
            style={{height: 60}}
            onClick={onContinueClicked}
            className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1">
            <strong>Next</strong>
            {
              // (status === FetchStatus.LOADING ||
              // verifyingPreviousLogin ||
              //   isPrefetchingForms)
              loading && (
                <>
                  <i
                    className="spinner-border spinner-border-sm text-black"
                    role="status"
                    aria-hidden="true"></i>
                  <i className="visually-hidden">Uploading.....</i>
                </>
              )
            }
          </button>
        ) : (
          <div className="d-flex" style={{gap:10}}>
             <button
              style={{height: 60}}
              // onClick={imageClick}
              onClick={handleSkip}
              className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1 retake">
              <strong>Skip</strong>
            </button>
            <button
              style={{height: 60}}
              onClick={imageClick}
              className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1 upload-btn">
              <strong>Retake</strong>
            </button>
            {/* {skipBtn && (
              <button
                style={{height: 60}}
                
                className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1 upload-btn">
                <strong>Skip</strong>
              </button>
            )} */}

           
          </div>
        )}

        {/* </Link> */}
      </div>
    </div>
  );
}

export default QuestionLayout;
