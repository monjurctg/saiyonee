import axios from "axios";

let ExploreServices = {};

ExploreServices.getShortList = () => {
  let url = "shortlist/get_shortlist_users";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err);
  return res;
};
ExploreServices.getLikeSupperLike = (id) => {
  let url = `all_liked/get_liked_by_users_list?is_superlike=${id ?? 0}`;
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err);
  return res;
};

ExploreServices.getMatchUsers = () => {
  let url = "match_making/get_match_list";
  let res = axios
    .get(url)
    .then((response) => response)
    .catch((err) => err);
  return res;
};

export default ExploreServices;
