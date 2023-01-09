import axios from "axios";

const UserServices = {};

UserServices.UserProfile = async () => {
  const res = await axios.get("/user");
  return res;
};

UserServices.filter_users = async () => {
  const res = await axios.get("/app_users/filter_users");
  return res;
};

UserServices.like_user = async (id) => {
  const res = await axios.post("/all_liked/submit_like", {
    liked_app_user_id: id,
  });
  return res;
};
UserServices.super_like_user = async (id) => {
  const res = await axios.post("/all_liked/submit_superlike", {
    superliked_app_user_id: id,
  });
  return res;
};

UserServices.edit_user_info = async (data) => {
  const res = await axios.post("/app_user_edit", data);
  return res;
};

UserServices.dislike_user = async (id) => {
  const res = await axios.post("/all_disliked/submit_dislike", {
    disliked_app_user_id: id,
  });
  return res;
};

UserServices.getBoomUsers = async () => {
  const res = await axios.get("/match_making/get_boom_match_list");
  return res;
};

UserServices.app_users = async () => {
  const res = await axios.get("/app_users/filter_users");
  return res;
};

UserServices.shortlisted_users = async () => {
  const res = await axios.get("/shortlist/get_shortlist_users");
  return res;
};

UserServices.help = async (data) => {
  const res = await axios.post("/submit_help_messages", data);
  return res;
};

UserServices.completion = async () => {
  const res = await axios.get(
    "/form_fields/calculate_profile_completion_precentage"
  );
  return res;
};

UserServices.message_users = async (data) => {
  const res = await axios.post("/live_chat/submit_chat_message", data);
  return res;
};

UserServices.getMessage = async (data) => {
  const res = await axios.post("/live_chat/get_chat_messages", data);
  return res;
};

UserServices.match_viewed = (data) => {
  return axios.post("/match_making/match_viewed", data);
};

export default UserServices;
