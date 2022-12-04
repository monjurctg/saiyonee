import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import RegisterLayout from "../layouts/RegisterLayout";

function Questions({id}) {
  const {dynamicQuestion} = useSelector((state) => state.preference);
  const navigate = useNavigate();

  const nowQuestion = dynamicQuestion.find((ques) => ques.id == id);

  let checkbox = <></>;

  let redio = <></>;

  let text = <></>;

  return (
    <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
      <div className="container pt-4 px-4">
        <div
          onClick={() => navigate(-1)}
          className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
          style={{height: "58px", width: "58px"}}>
          <img src="/img/back-icon.svg" alt="back" />
        </div>
      </div>
      <div className="container px-4 pb-2 overflow-auto">
        <h1>{nowQuestion?.title}</h1>

        <div className="mt-4 mb-5">
          <h4 className="mb-2">{nowQuestion?.label}</h4>
        </div>
      </div>
    </div>
  );
}

export default Questions;
