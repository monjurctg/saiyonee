import {Navigate, Outlet, useLocation} from "react-router-dom";

function ConditionalRoute() {
  const isVerified = localStorage.getItem("isVerified");
  const is_banned = localStorage.getItem("is_banned");
  const img_edit = localStorage.getItem("edit_img");
  const selfi_edit = localStorage.getItem("selfie_edit");

  // let auth = getToken()
  let location = useLocation();

  if (isVerified == 0 && is_banned == 0) {
    return <Navigate to="/success" state={{from: location}} />;
  } else if (isVerified == 1 && is_banned == 0) {
    return <Navigate to="/review" state={{from: location}} />;
  }

  return <Outlet />;
}
export default ConditionalRoute;
