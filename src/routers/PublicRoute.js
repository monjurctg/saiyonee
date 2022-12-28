import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function PublicRoute({varification}) {
  // let auth = useAuth();
  let auth = getToken();
  let location = useLocation();
  const isVarified = localStorage.getItem("isVarified");
  console.log("isVarified", auth);

  if (auth && isVarified == 1) {
    console.log("first");
    return <Navigate to="/question/1" state={{from: location}} />;
  }

  return <Outlet />;
}
export default PublicRoute;
