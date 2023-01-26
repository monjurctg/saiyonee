import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function PrivateRoute() {
  // let auth = useAuth();
  let auth = getToken();
  let location = useLocation();
  const isVarified = localStorage.getItem("isVarified");
  const isBanned = localStorage.getItem("isBanned");
  const isAlreadySetPreference = localStorage.getItem("preference");
  const emailVerified = localStorage.getItem("emailVerified");
  console.log('emailVerified privatw', emailVerified)
  const img_edit = localStorage.getItem("edit_img");
  const selfi_edit = localStorage.getItem("selfie_edit");

  // console.log(varification.ques.length);
  console.log("hello private");

  if (!auth) {
    return <Navigate to="/get-start" state={{from: location}} />;
  } else if (auth && isVarified == 0 && isBanned == 0 && emailVerified == true) {
    return <Navigate to="/success" state={{from: location}} />;
  } else if (auth && isVarified == 1 && isBanned == 1) {
    return <Navigate to="/review" state={{from: location}} />;
  } else if (
    auth &&
    isVarified ==="true" &&
    isBanned == "false" &&
    !isAlreadySetPreference &&
    emailVerified == true
  ) {
    return <Navigate to="/question/1" state={{from: location}} />;
  } else if (
    auth &&
    isVarified == "true" &&
    isBanned == "false" &&
    isAlreadySetPreference
  ) {
    return <Navigate to="/home" state={{from: location}} />;
  }

  // if (auth && isVarified === 1 && isAlreadySetPreference == true) {
  //   return <Navigate to="/home" state={{from: location}} />;
  // }

  return <Outlet />;
}
export default PrivateRoute;
