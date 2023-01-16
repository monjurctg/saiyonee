import axios from "axios";
const AuthServices = {};

AuthServices.checkIsEmailUnique = async (data) => {
  let url = "/confirm_email_is_unique";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  // let res = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify(data),
  // });

  return res;
};

AuthServices.register = async (data) => {
  // console.log('data', data)
  let url = "/ApiRegister";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};
AuthServices.socialRegister = async (data) => {
  // console.log('data', data)
  let url = "/social_login/complete_social_registration";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

AuthServices.login = async (data) => {
  // console.log('data', data)
  let url = "/ApiLogin";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

AuthServices.checkPage = async (data) => {
  let url = "/app_track_data";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

AuthServices.checkVarified = async () => {
  // console.log('data', data)
  let url = "/check_verified";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

AuthServices.logout = async () => {
  // console.log('data', data)
  let url = "/ApiLogout";
  let res = axios
    .post(url)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

AuthServices.socialAppUserToken = async (data) => {
  // console.log('data', data)
  let url = "/social_login/retrieve_app_user_from_token";

  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};
AuthServices.forgotPassword = async (data) => {
  // console.log('data', data)
  let url = "/forgot_password";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

AuthServices.resetPassword = async (data) => {
  // console.log('data', data)
  let url = "/reset_password";
  let res = axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

export default AuthServices;
