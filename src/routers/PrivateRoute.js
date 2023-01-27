import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function PrivateRoute() {
  // let auth = useAuth();
  let auth = getToken();
  let location = useLocation();
  const isVarified = localStorage.getItem("isVarified");
  const isBanned = localStorage.getItem("is_banned");
  const isAlreadySetPreference = localStorage.getItem("preference");
  const emailVerified = localStorage.getItem("emailVerified");
  console.log("emailVerified privatw", emailVerified);

  // console.log(varification.ques.length);
  console.log("hello private", isVarified, isBanned, emailVerified);

  if (!auth) {
    return <Navigate to="/get-start" state={{from: location}} />;
  } else if (
    auth &&
    isVarified === "false" &&
    isBanned === "false" &&
    emailVerified === "false"
  ) {
    return <Navigate to="/email-verification" state={{from: location}} />;
  } else if (
    auth &&
    isVarified === "false" &&
    isBanned === "false" &&
    emailVerified === "true"
  ) {
    return <Navigate to="/success" state={{from: location}} />;
  } else if (auth && isVarified === "true" && isBanned === "true") {
    return <Navigate to="/review" state={{from: location}} />;
  } else if (
    auth &&
    isVarified === "true" &&
    isBanned === "false" &&
    isAlreadySetPreference === "false" &&
    emailVerified === "true"
  ) {
    return <Navigate to="/question/1" state={{from: location}} />;
  } else if (
    auth &&
    isVarified === "true" &&
    isBanned === "false" &&
    emailVerified === "true" &&
    isAlreadySetPreference === "true"
  ) {
    return <Navigate to="/home" state={{from: location}} />;
  }

  // if (auth && isVarified === 1 && isAlreadySetPreference == true) {
  //   return <Navigate to="/home" state={{from: location}} />;
  // }

  return <Outlet />;
}
export default PrivateRoute;
