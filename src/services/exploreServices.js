import axios from "axios";

let ExploreServices = {};

ExploreServices.getShortList =  () => {
  let url = "shortlist/get_shortlist_users";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
  return res.data;
};


export default ExploreServices;
