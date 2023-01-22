import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";
import AuthServices from "../../services/authServices";

function Location() {
  let navigate = useNavigate();
  let {pathname} = useLocation();

  const [err, setErr] = useState();

  const {current_city, current_country, email} = useSelector(
    (state) => state.auth
  );
  let socialToken = localStorage.getItem("social-token");
  // console.log(
  //   current_country == "Select candidate's current country",
  //   "check current country"
  // );
  const onContinueClicked = async () => {
    if (current_country == "Select candidate's current country") {
      setErr({
        error: "current_country",
        message: "Please select a country",
      });
      return;
    }

    if (current_city === "Select candidate's current city") {
      setErr({
        error: "current_city",
        message: "Please select a city",
      });
      return;
    }

    let data = {
      email: email,
      page_name: pathname,
    };

    if (!socialToken) {
      let res = await AuthServices.checkPage(data);

      if (res.status == 200) {
        navigate("/register/family_info");
      } else {
        console.log(data);
        console.log(res);
      }
    } else {
      navigate("/register/family_info");
    }
  };
  return (
    <>
      <RegisterLayout err={err} onContinueClicked={onContinueClicked}>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1 className="card-title">Current Country and City</h1>
          <p className="text-muted mt-5 mb-2">Candidate's current country</p>
          <Link to={"/register/location/country"}>
            <div
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
              style={{
                fontFamily: "Inter",
                border: err?.error == "current_country" ? "2px solid red" : "",
              }}>
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {current_country ? current_country : "Select current country"}
                </label>
              </div>
              <div className="col-2 d-flex justify-content-end pe-3">
                <img
                  src="/img/back-icon.svg"
                  alt="next"
                  className="rotate-180"
                />
              </div>
            </div>
          </Link>
          <p className="text-muted mt-5 mb-2">Candidate's current city</p>
          <Link to={"/register/location/city"}>
            <div
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
              style={{
                fontFamily: "Inter",
                border: err?.error == "current_city" ? "2px solid red" : "",
              }}>
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {current_city ? current_city : "Select current city"}
                </label>
              </div>
              <div className="col-2 d-flex justify-content-end pe-3">
                <img
                  src="/img/back-icon.svg"
                  alt="next"
                  className="rotate-180"
                />
              </div>
            </div>
          </Link>
        </div>
      </RegisterLayout>
    </>
  );
}

export default Location;
