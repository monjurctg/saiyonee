import axios from "axios";
const AuthServices = {};

AuthServices.checkIsEmailUnique = async (data) => {
  let url = "https://backend.saiyonee.com/api/confirm_email_is_unique";
  // let res = axios
  //   .post(url, email)
  //   .then((response) => response)
  //   .catch((err) => err.response);
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });

  return res;
};

export default AuthServices;
