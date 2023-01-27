import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function NotVarified() {
  console.log("first");
  const isVerified = localStorage.getItem("isVerified");
  const is_banned = localStorage.getItem("is_banned");
  const emailVerified = localStorage.getItem("emailVerified");
  const token = getToken();

  // d");
  // let auth = getToken()
  let location = useLocation();
  if (!token) {
    return <Navigate to="/get-start" state={{from: location}} />;
  } else if (token && isVerified === "true" && emailVerified === "true") {
    return <Navigate to="/home" state={{from: location}} />;
  }

  return <Outlet />;
}
export default NotVarified;
