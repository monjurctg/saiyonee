import axios from "axios";
const AuthServices = {};

AuthServices.checkIsEmailUnique = async (email) => {
  let url = "confirm_email_is_unique";
  let res = axios.post(url, email).then((response) => response).catch((err) => err.response);

  return res;
};

export default AuthServices;
