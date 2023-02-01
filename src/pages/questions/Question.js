import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import QuestionLayout from "../../components/layouts/QuestionLayout";
import QuestionServices from "../../services/questionServices";
import toastMsg from "../../utils/toastify";

function Question() {
  const [err, seterr] = useState(null);
  const [length, setlength] = useState(0);
  const profile_image = localStorage.getItem("profile_image");
  const selfie_image = localStorage.getItem("selfie_image");
  const isAlreadySetPreference = localStorage.getItem("preference");
  // console.log('first')
  const navigate = useNavigate();
  let {id} = useParams();
  const [inputs, setInputs] = useState({
    user_checked: [],
    user_radio: [],

    form_field_id: "",
    text_input: "",
  });
  console.log("id", id);

  const [question, setquestion] = useState("");
  const [loading, setLoading] = useState(true);

  let getQuestions = async () => {
    let res = await QuestionServices.getQuestions();
    // console.log("res", res.data.form_field_questions);
    console.log("res", res);
    if (res.status === 200) {
      console.log("res", res);
      seterr(false);
      setLoading(false);
      setlength(res.data.form_field_questions.length);
      if (res.data.form_field_questions?.length === 0) {
        if (profile_image === "false") {
          navigate("/question/image");
        } else if (selfie_image === "false") {
          navigate("/question/selfie-verification");
        } else if (isAlreadySetPreference === "false") {
          navigate("/preference");
        } else {
          navigate("/home");
        }

        return;
      }

      setquestion(res.data.form_field_questions[0]);
    } else {
      seterr(res.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getQuestions();
  }, [id]);

  // console.log(question);

  let inputChange = (e) => {
    let {name, value} = e.target;
    if (name === "user_checked") {
      let arr = inputs.user_checked;
      // console.log("value", value);

      console.log(
        "arr.includes(value)",
        arr.filter((i) => i === value)
      );
      if (arr.filter((i) => i == value) > 0) {
        arr = arr.filter((item) => item !== value);
        //   console.log('[...new Set(chars)]', [...new Set(arr)])
        // console.log('arr', arr)
      } else {
        arr.push(value);
        // console.log('arr2', arr)
      }
      setInputs({...inputs, user_checked: arr});
    } else if (name === "user_radio") {
      setInputs({...inputs, user_radio: value});
    } else {
      setInputs({...inputs, [name]: value});
    }
  };
  // console.log('inputs', inputs)
  let field = "";
  if (question?.field_type === "text" || question?.field_type === "textarea") {
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
          value={`${key + 1}`}
          className="input-checkbox"
          id={"user_checked" + key}
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

    // formdata.append('user_input[]', data
    // console.log("inputs.user_checked", inputs.user_checked);
    // inputs.user_checked.length > 0 ?
    if (inputs.user_checked.length > 0) {
      for (let i = 0; i < inputs.user_checked.length; i++) {
        formData.append("user_input[]", inputs.user_checked[i]);
      }
    }
    // inputs.user_checked.map(user=>(
    // formData.append("user_input[]", [...inputs.user_checked]);

    // console.log('inputs.user_radio', inputs.user_radio)
    inputs.user_radio.length > 0 &&
      formData.append("user_input", inputs.user_radio);

    // document.getElementById("user_checked").checked = false;

    console.log("id,length", length - 1);
    // navigate(
    //   length-1 > 0 ? `/question/${parseInt(id) + 1}` : `/question/image`
    // );
    let res = await QuestionServices.answer(formData);
    if (res.status === 200) {
      inputs.user_checked.length > 0 &&
        inputs.user_checked.map((user, key) => {
          // console.log(
          //   'document.getElementById("user_checked"+key)',
          //   document.getElementById("user_checked" + key).checked
          // );
          document.getElementById("user_checked" + key).checked = false;
        });
      seterr(false);
      setLoading(false);
      setInputs({
        text_input: "",
        user_checked: [],
        user_radio: "",
      });
      // Navigate
      navigate(
        length - 1 > 0 ? `/question/${parseInt(id) + 1}` : `/question/image`
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
