import {Navigate, Outlet, useLocation} from "react-router-dom";
import { getToken } from "../utils/functions";

function PrivateRoute() {
  // let auth = useAuth();
  let auth = getToken()
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/get-start" state={{from: location}} />;
  }

  return <Outlet />;
}
export default PrivateRoute;
