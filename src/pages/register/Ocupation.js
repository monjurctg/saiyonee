import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";
import {
  setCurrentEmplyType,
  setDesignation,
  setEmployName,
  setWorkingSince,
} from "../../redux/slices/authSlices";
import AuthServices from "../../services/authServices";
import {stoteRegisterValues} from "../../utils/functions";

function Ocupation() {
  const [err, setErr] = useState();
  let {pathname} = useLocation();
  let socialToken = localStorage.getItem("social-token");
  const [loading, setLoading] = useState(false);
  const [employeeType, setemployeeType] = useState([
    "Unemployed",
    "Student",
    " ",
  ]);

  const navigate = useNavigate();
  // let currentEmploymentTypeOther = true;
  // let current_employment_type = "v";
  // let industry = "hello";

  const dispatch = useDispatch();

  const {
    current_employment_type,
    designation,
    employer_name,
    currentEmploymentTypeOther,
    industry,
    working_since,
    email,
  } = useSelector((state) => state.auth);
  // console.log("current_employment_type", employeeType?.includes(current_employment_type));

  // console.log('current_employment_type',current_employment_type !==  ("Unemployed" && "Student"))

  let onContinueClicked = async () => {
    if (current_employment_type.length === 0) {
      setErr({
        error: "current_employment_type",
        message: "Please select Employment Type",
      });
      return;
    }

    if (
      !employeeType?.includes(current_employment_type) &&
      industry === "Select Industry"
    ) {
      setErr({
        error: "industry",
        message: "Please select Industry",
      });
      return;
    }

    // if (
    //   (!employeeType?.includes(current_employment_type) && !employer_name) ||
    //   !current_employment_type
    // ) {
    //   setErr({
    //     error: "employer_name",
    //     message: "Employer cannot be blank",
    //   });
    //   return;
    // }

    // if (!employeeType?.includes(current_employment_type) && !designation) {
    //   setErr({
    //     error: "designation",
    //     message: "Designation cannot be blank",
    //   });
    //   return;
    // }

    // if (!employeeType?.includes(current_employment_type) && !working_since) {
    //   setErr({
    //     error: "working_since",
    //     message: "Working since is  mandatory",
    //   });
    //   return;
    // }

    if (!socialToken) {
      let data = {
        email: email,
        page_name: pathname,
      };
      setLoading(true);
      let res = await AuthServices.checkPage(data);
      if (res.status === 200) {
        setLoading(false);
        navigate("/register/location");
      }
    } else {
      setLoading(false);
      navigate("/register/location");
    }
  };
  return (
    <>
      <RegisterLayout
        onContinueClicked={onContinueClicked}
        err={err}
        loading={loading}
      >
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1 className="card-title">Candidate’s Professional Background</h1>
          <p className="text-muted mt-5 mb-2">Current Employment type</p>
          <Link to={"/register/ocupation/type"}>
            <div
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1"
              style={{
                fontFamily: "Inter",
                border:
                  err?.error == "current_employment_type"
                    ? "2px solid red"
                    : "",
              }}
            >
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {currentEmploymentTypeOther
                    ? "Other"
                    : current_employment_type
                    ? current_employment_type
                    : "Select current employment type"}
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
          {currentEmploymentTypeOther && (
            <div
              className="form-floating my-4 text-muted rounded-1"
              style={{
                fontFamily: "Inter",
                border:
                  err?.error == "current_employment_type"
                    ? "2px solid red"
                    : "",
              }}
            >
              <input
                type="text"
                id="inputEmploymentType"
                value={current_employment_type}
                onChange={(e) => dispatch(setCurrentEmplyType(e.target.value))}
                className="form-control border-0 rounded-1"
                placeholder="employmentType"
                aria-describedby="employmentType"
              />
              <label htmlFor="inputEmploymentType">
                Enter other employment type
              </label>
            </div>
          )}
          {!current_employment_type == "" &&
            current_employment_type !== "Unemployed" &&
            current_employment_type !== "Student" && (
              <>
                <p className="text-muted mt-5 mb-2">Industry</p>
                <Link to={"/register/ocupation/industry"}>
                  <div
                    className="row my-4 align-items-center bg-white px-2 py-4 rounded-1"
                    style={{
                      fontFamily: "Inter",
                      border: err?.error == "industry" ? "2px solid red" : "",
                    }}
                  >
                    <div className="col-10">
                      <label className="form-check-label bg-white px-2 text-body">
                        {industry ? industry : "Select Industry"}
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
                <div
                  className="form-floating my-4 text-muted rounded-1"
                  style={{
                    fontFamily: "Inter",
                    border:
                      err?.error == "employer_name" ? "2px solid red" : "",
                  }}
                >
                  <input
                    type="text"
                    id="inputEmployer"
                    value={employer_name}
                    onChange={(e) => {
                      dispatch(setEmployName(e.target.value));
                      stoteRegisterValues({ employer_name: e.target.value });
                    }}
                    //   onChange={onEmployerNameChanged}
                    className="form-control border-0 rounded-1"
                    placeholder="employer"
                    aria-describedby="employer"
                  />
                  <label htmlFor="inputEmployer">
                    Enter your organization name
                  </label>
                </div>
                <div
                  className="form-floating my-4 text-muted  rounded-1"
                  style={{
                    fontFamily: "Inter",
                    border: err?.error == "designation" ? "2px solid red" : "",
                  }}
                >
                  <input
                    type="text"
                    id="inputDesignation"
                    value={designation}
                    onChange={(e) => {
                      dispatch(setDesignation(e.target.value));
                      stoteRegisterValues({ designation: e.target.value });
                    }}
                    className="form-control border-0 rounded-1"
                    placeholder="designation"
                    aria-describedby="designation"
                  />
                  <label htmlFor="inputDesignation">Enter designation</label>
                </div>
                <div
                  className="form-floating my-3 text-muted rounded-1"
                  style={{
                    fontFamily: "Inter",
                    border:
                      err?.error == "working_since" ? "2px solid red" : "",
                  }}
                >
                  <input
                    type="date"
                    id="inputWorkingSinceDate"
                    className="form-control border-0 rounded-1"
                    placeholder="name@example.com"
                    aria-describedby="workingSinceDate"
                    onChange={(e) => {
                      let current_date = new Date();
                      let selected_date = new Date(e.target.value);
                      if (selected_date > current_date) {
                        setErr(
                          "Working since cannot be greater than current date"
                        );
                      } else {
                        dispatch(setWorkingSince(e.target.value));
                        setErr("");
                        stoteRegisterValues({ working_since: e.target.value });
                      }
                    }}
                    value={working_since}
                    //   onChange={onWorkingSinceDateChange}
                  />
                  <label htmlFor="inputWorkingSinceDate">Working Since</label>
                </div>
              </>
            )}
        </div>
      </RegisterLayout>
    </>
  );
}

export default Ocupation;
