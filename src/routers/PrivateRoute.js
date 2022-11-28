import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function PrivateRoute() {
  // let auth = useAuth();
  let auth = getToken();
  let location = useLocation();
  const isVarified = localStorage.getItem("isVarified");
  if (auth && isVarified == 0) {
    return <Navigate to="/success" state={{from: location}} />;
  }
  if (!auth && isVarified != 1) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  return <Outlet />;
}
export default PrivateRoute;
