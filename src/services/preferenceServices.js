import axios from "axios";

let PreferenceServices = {};

PreferenceServices.getFilterQuestion = async () => {
  let url = "/form_filters/get_form_filters";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

export default PreferenceServices;