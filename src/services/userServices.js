import axios from "axios";

const UserServices = {};

UserServices.UserProfile = async () => {
  const res = await axios.get("/user");
  return res;
}

UserServices.filter_users = async () => {
  const res = await axios.get("/app_users/filter_users");
  return res;
}

export default UserServices;