import axios from "axios";

const UserServices = {};

UserServices.UserProfile = async () => {
  const res = await axios.get("/user");
  return res;
}

export default UserServices;