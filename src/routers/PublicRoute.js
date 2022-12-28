import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getToken} from "../utils/functions";

function PublicRoute({varification}) {
  // let auth = useAuth();
  let auth = getToken();

  let location = useLocation();
  const isVarified = localStorage.getItem("isVarified");

  if (auth && isVarified == 1 && varification?.ques?.length > 0) {
    return <Navigate to="/question/1" state={{from: location}} />;
  } else if (auth && isVarified == 1 && !varification?.addImg) {
    return <Navigate to="/question/image" state={{from: location}} />;
  } else if (auth && isVarified == 1 && !varification?.selfie == null) {
    return (
      <Navigate to="/question/selfie-verification" state={{from: location}} />
    );
  }

  return <Outlet />;
}
export default PublicRoute;
