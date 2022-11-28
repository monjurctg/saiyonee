import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function RegisterRoute() {
  // let auth = useAuth();
  let isRegister = localStorage.getItem("regStart");
  const {isRegStart} = useSelector((state) => state.auth);
  let location = useLocation();
  const token = getToken();

  if (!isRegStart && token) {
    return <Navigate to="/success" state={{from: location}} />;
  }
  if (!isRegStart) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  return <Outlet />;
}
export default RegisterRoute;