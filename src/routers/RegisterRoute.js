import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function RegisterRoute() {
  // let auth = useAuth();
  let isRegister = localStorage.getItem("regStart");
  let socialToken = localStorage.getItem("social-token");
  const isVarified = localStorage.getItem("isVarified");
  const isBanned = localStorage.getItem("is_banned");
  const isAlreadySetPreference = localStorage.getItem("preference");
  const emailVerified = localStorage.getItem("emailVerified");
  console.log("emailVerified privatw", emailVerified);
  const {isRegStart} = useSelector((state) => state.auth);
  let location = useLocation();
  console.log(isRegStart, "reg start");

  const token = getToken();
  if (isRegStart === false) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  if (isRegStart === false && !socialToken) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  return <Outlet />;
}
export default RegisterRoute;
