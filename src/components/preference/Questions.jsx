import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  setpreferenceAns,
  updatePreerenceQAns,
} from "../../redux/slices/preferenceSlice";

function Questions({id}) {
  const {dynamicQuestion, dynamicQuesAns} = useSelector(
    (state) => state.preference
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nowQuestion = dynamicQuestion.find((ques) => ques.id == id);
  let ids = [];

  let inputChange = (e) => {
    ids.push(e.target.value);
  };

  let back = () => {
    const filterData = dynamicQuesAns.filter((ids) => ids.split("-")[0] != id);
    // console.log(filterData, "filter");
    if (filterData.length > 0) {
      // console.log("hello");
      dispatch(updatePreerenceQAns(filterData));
    }
    dispatch(setpreferenceAns(`${id}-${Array.from(new Set(ids))}`));
    navigate(-1);
  };

  let checkbox = nowQuestion?.value_list?.map((value, key) => (
    <div
      className="d-flex justify-content-between input-text align-item-center"
      key={key}>
      <p className="p-input">{value}</p>
      <input
        type="checkbox"
        onChange={inputChange}
        name="user_checked"
        value={parseInt(key + 1)}
        className="input-checkbox"
        placeholder={`Enter ${nowQuestion?.label}`}
      />
    </div>
  ));

  let radio = nowQuestion?.value_list?.map((value, key) => (
    <div
      className="d-flex justify-content-between input-text align-item-center"
      key={key}>
      <p className="p-input">{value}</p>
      <input
        type="radio"
        onChange={inputChange}
        name="user_radio"
        value={parseInt(key + 1)}
        className="input-checkbox"
        placeholder={`Enter ${nowQuestion?.label}`}
      />
    </div>
  ));

  let text = (
    <>
      <input
        name="text_input"
        type="text"
        onChange={inputChange}
        // value={inputs.text_input}
        className="input-text"
        placeholder={`Enter ${nowQuestion?.label}`}
      />
    </>
  );

  return (
    <div className="vh-100 d-flex flex-column max-width-mobile mx-auto">
      <div className="container pt-4 px-4">
        <div
          onClick={back}
          className="btn btn-primary rounded-circle shadow p-3 mb-4 image-invert"
          style={{height: "58px", width: "58px"}}>
          <img src="/img/back-icon.svg" alt="back" />
        </div>
      </div>
      <div className="container px-4 pb-2 overflow-auto">
        <h1 className="card-title">{nowQuestion?.title}</h1>

        <div className="mt-4 mb-5">
          <h4 className="mb-2">{nowQuestion?.label}</h4>

          {nowQuestion?.field_type == "checkbox" ? (
            checkbox
          ) : nowQuestion?.field_type == "radio" ? (
            radio
          ) : nowQuestion?.field_type == "text" ? (
            text
          ) : (
            <h1>404</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;
