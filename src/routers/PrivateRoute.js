import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function PrivateRoute() {
  // let auth = useAuth();
  let auth = getToken();
  let location = useLocation();
  const isVarified = localStorage.getItem("isVarified");
  const isAlreadySetPreference = localStorage.getItem("preference");
  console.log(isAlreadySetPreference);

  if (auth && isVarified == 0) {
  }
  if (!auth && isVarified != 1) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }
  if (auth && isVarified === 1 && isAlreadySetPreference != true) {
    return <Navigate to="/question/1" state={{from: location}} />;
  }
  // if (auth && isVarified === 1 && isAlreadySetPreference == true) {
  //   return <Navigate to="/home" state={{from: location}} />;
  // }

  return <Outlet />;
}
export default PrivateRoute;
