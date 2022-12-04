import React, {useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import QuestionLayout from "../../components/layouts/QuestionLayout";
import QuestionServices from "../../services/questionServices";

function Question() {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const navigate = useNavigate();
  let {id} = useParams();
  const [inputs, setInputs] = useState({
    user_checked: [],
    user_radio: [],

    form_field_id: "",
    text_input: "",
  });
  // console.log('id', id)

  const [question, setquestion] = useState("");
  const [loading, setLoading] = useState(true);

  let getQuestions = async () => {
    let res = await QuestionServices.getQuestions();
    // console.log("res", res.data.form_field_questions);
    if (res.status === 200) {
      seterr(false);
      setLoading(false);
      setlength(res.data.form_field_questions.length);
      if(res.data.form_field_questions?.length === 0 ) navigate("/preference")
      setquestion(res.data.form_field_questions[id - 1]);
    } else {
      seterr(res.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {

    getQuestions();
  }, [id]);

  let inputChange = (e) => {
    let {name, value} = e.target;
    if (name === "user_checked") {
      let arr = inputs.user_checked;
      // console.log('arr', arr)
      if (arr.includes(value)) {
        arr = arr.filter((item) => item !== parseInt(value));
      } else {
        arr.push(parseInt(value));
      }
      setInputs({...inputs, user_checked: arr});
    } else if (name === "user_radio") {
      let arr = inputs.user_radio;
      console.log('arr', arr)
      // if (arr.includes(value)) {
      //   arr = arr.filter((item) => item !== value);
      // } else {
        arr.push(value);
      // }
      setInputs({...inputs, user_radio: arr});
    } else {
      setInputs({...inputs, [name]: value});
    }
  };
  // console.log('inputs', inputs)
  let field = "";
  if (question?.field_type === "text") {
    field = (
      <input
        name="text_input"
        type="text"
        onChange={inputChange}
        value={inputs.text_input}
        className="input-text"
        placeholder={`Enter ${question?.label}`}
      />
    );
  } else if (question?.field_type === "checkbox") {
    field = question?.value_list?.map((value, key) => (
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
          placeholder={`Enter ${question?.label}`}
        />
      </div>
    ));
  } else if (question?.field_type === "radio") {
    field = question?.value_list?.map((value, key) => (
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
          placeholder={`Enter ${question?.label}`}
        />
      </div>
    ));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log('type of ', typeof inputs.user_checked[0] )
    let formData = new FormData();
    formData.append("form_field_id", question?.id);
    inputs.text_input && formData.append("text_input", inputs.text_input);

    inputs.user_checked.length > 0 &&
      // inputs.user_checked.map(user=>(
      formData.append("user_input", [...inputs.user_checked]);
    // ))
    console.log('first', inputs.user_radio)
    inputs.user_radio.length > 0 &&
      formData.append("user_input", inputs.user_radio);

    let res = await QuestionServices.answer(formData);
    // console.log('res', res)
    if (res.status === 200) {
      seterr(false);
      setLoading(false);
      // Navigate
      navigate(
        id <= length - 1 ? `/question/${parseInt(id) + 1}` : `/question/${id}`
      );
    } else {
      seterr(res.data.message);
      setLoading(false);
    }

    // console.log("data", formData);
  };
  return (
    <QuestionLayout
      err={err}
      onContinueClicked={onSubmit}
      length={length}
      loading={loading}
      title={question?.title}>
      <div className="mt-4 mb-5">
        <h4 className="mb-2">{question?.label}</h4>

        {field}
      </div>
    </QuestionLayout>
  );
}

export default Question;
