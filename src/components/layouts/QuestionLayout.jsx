import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";

function QuestionLayout({ children, err, onContinueClicked, length, title,loading }) {
  console.log("length", length);
  let { id } = useParams();

  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
      <div className="container px-4 pt-4">
        <div
          onClick={() => navigate(-1)}
          className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
          style={{ height: "58px", width: "58px" }}
        >
          <img src="/img/back-icon.svg" alt="back" />
        </div>
      </div>
      {loading && <Loader />}
      <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
        <h1>{title}</h1>

        {children}
      </div>

      <div className="container px-4 pb-4 pt-2">
        {err && <p className="text-primary">* {err}</p>}

        {/* <Link to={} > */}
        <button
          style={{ height: 60 }}
          onClick={onContinueClicked}
          className="btn btn-primary w-100 rounded shadow p-3 mb-2 mt-1"
        >
          <strong>Next</strong>
        </button>

        {/* </Link> */}
      </div>
    </div>
  );
}

export default QuestionLayout;
