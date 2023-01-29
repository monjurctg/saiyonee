import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function NotVarified() {
  const isVerified = localStorage.getItem("isVarified");
  const isBanned = localStorage.getItem("is_banned");
  const isAlreadySetPreference = localStorage.getItem("preference");
  const emailVerified = localStorage.getItem("emailVerified");
  const token = getToken();

  // d");
  console.log("not varified", isVerified, emailVerified);
  // let auth = getToken()
  let location = useLocation();
  if (!token) {
    return <Navigate to="/get-start" state={{from: location}} />;
  } else if (
    token &&
    isVerified === "true" &&
    emailVerified === "true" &&
    isBanned === "false" &&
    isAlreadySetPreference === "true"
  ) {
    return <Navigate to="/home" state={{from: location}} />;
  }

  return <Outlet />;
}
export default NotVarified;
