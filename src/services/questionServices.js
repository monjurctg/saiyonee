import axios from "axios";

let QuestionServices = {};

QuestionServices.getQuestions = async () => {
  let url = "form_fields/get_form_field_questions";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
}

export default QuestionServices;