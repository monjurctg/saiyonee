import axios from "axios";

let ExploreServices = {};

ExploreServices.submitShortList = (id) => {
  let url = "shortlist/submit_shortlist";
  let res = axios
    .post(url, id)
    .then((response) => response)
    .catch((err) => err);
  return res;
};

ExploreServices.removeFromShortList = (id) => {
  let url = "shortlist/remove_from_shortlist";
  let res = axios
    .post(url, id)
    .then((response) => response)
    .catch((err) => err);
  return res;
};

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
ExploreServices.addSupperLike = (id) => {
  let url = `all_liked/submit_superlike`;
  let res = axios.post(url, id);

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
ExploreServices.getSinglerUserInfo = (id, appId) => {
  let url = `/app_users/get_matched_single_user_info`;
  const data = new FormData();
  data.append("app_user_id", appId);
  let res = axios.post(url, data);
  return res;
};

ExploreServices.getSingleLiked = (app_user_id) => {
  let url = `/app_users/get_liked_you_single_user_info`;
  const data = new FormData();
  data.append("app_user_id", app_user_id);
  let res = axios.post(url, data);
  return res;
};
ExploreServices.getSingleShortList = (app_user_id) => {
  let url = `/app_users/get_shortlist_single_user_info`;
  const data = new FormData();
  data.append("app_user_id", app_user_id);
  let res = axios.post(url, data);
  return res;
};
ExploreServices.getSingleMatchList = (app_user_id) => {
  let url = `/app_users/get_matched_single_user_info`;
  const data = new FormData();
  data.append("app_user_id", app_user_id);
  let res = axios.post(url, data);

  return res;
};

export default ExploreServices;
