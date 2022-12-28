import axios from "axios";

let QuestionServices = {};

QuestionServices.getQuestions = async () => {
  let url = "form_fields/get_form_field_questions";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};
QuestionServices.answer = async (data) => {
  // console.log('data', data)
  let url = "form_fields/submit_form_field_answer";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};
QuestionServices.getProfileImage = async () => {
  let url = "user_images/get_profile_images";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

QuestionServices.submitProfilePhoto = async (data) => {
  // console.log('data', data)
  let url = "user_images/submit_profile_images";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};
QuestionServices.getSelfieImage = async () => {
  let url = "user_images/get_selfie_image";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

QuestionServices.submitSelfiePhoto = async (data) => {
  // console.log('data', data)
  let url = "user_images/submit_selfie_image";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

QuestionServices.routeData = async () => {
  const resQues = await QuestionServices.getQuestions();
  const resImg = await QuestionServices.getProfileImage();
  const selfieImg = await QuestionServices.getSelfieImage();
  return {
    ques: resQues.data.form_field_questions,
    addImg: resImg.data.images.profile_img,
    selfie: selfieImg.data.images.selfie_img,
  };
};

export default QuestionServices;
