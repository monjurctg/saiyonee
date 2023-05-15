import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";
import {
  setEducation1,
  setEducation2,
  setEducation3,
  setEducation4,
  setinstitution1,
  setinstitution2,
  setinstitution3,
  setinstitution4,
  setMajor1,
  setMajor2,
  setMajor3,
  setMajor4,
  setPassingYear1,
  setPassingYear2,
  setPassingYear3,
  setPassingYear4,
} from "../../redux/slices/authSlices";
import AuthServices from "../../services/authServices";
import { stoteRegisterValues } from "../../utils/functions";
import RegInput from "../../components/InputType/RegInput";

let scrollPos = 0;

function Education() {
  const navigate = useNavigate();
  let socialToken = localStorage.getItem("social-token");
  const { date_of_birth } = useSelector((state) => state.auth);
  const scrollContainerRef = useRef();
  let { pathname } = useLocation();
  const onEducationSelectorClicked = useCallback(() => {
    scrollPos = scrollContainerRef.current?.scrollTop;
  }, []);
  const resetScroll = useCallback(() => {
    scrollPos = 0;
  }, []);
  useEffect(() => {
    if (typeof scrollPos !== "undefined")
      scrollContainerRef.current?.scrollTo({ top: scrollPos });
  }, [onEducationSelectorClicked]);
  const {
    education1Other,
    education2Other,
    education3Other,
    education4Other,
    education1_passing_year,
    education2_passing_year,
    education3_passing_year,
    education4_passing_year,
    education1_institution,
    education2_institution,
    education3_institution,
    education4_institution,

    education1_major,
    education2_major,
    education3_major,

    education4_major,

    education1,
    education2,
    education3,
    education4,
    email,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [year1Dropdown, setYear1Dropdown] = useState(false);
  const toggleYear1Dropdown = () => setYear1Dropdown((dropdown) => !dropdown);
  const delayedYear1Dismiss = () =>
    setTimeout(() => setYear1Dropdown(false), 200);

  const [year2Dropdown, setYear2Dropdown] = useState(false);
  const toggleYear2Dropdown = () => setYear2Dropdown((dropdown) => !dropdown);
  const delayedYear2Dismiss = () =>
    setTimeout(() => setYear2Dropdown(false), 200);

  const [year3Dropdown, setYear3Dropdown] = useState(false);
  const toggleYear3Dropdown = () => setYear3Dropdown((dropdown) => !dropdown);
  const delayedYear3Dismiss = () =>
    setTimeout(() => setYear3Dropdown(false), 200);

  const [year4Dropdown, setYear4Dropdown] = useState(false);
  const toggleYear4Dropdown = () => setYear4Dropdown((dropdown) => !dropdown);
  const delayedYear4Dismiss = () =>
    setTimeout(() => setYear4Dropdown(false), 200);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dateOfBirthYear = new Date(date_of_birth).getFullYear() + 10;

  const passingYears = Array.from(
    new Array(new Date().getFullYear() - dateOfBirthYear + 1)
  ).map((_, i) => dateOfBirthYear + i);

  // alert(dateOfBirthYear);

  let onContinueClicked = async () => {
    if (!education1 || education1 === "Select education") {
      setErr({
        error: "education1",
        message: "Please select your Secondary Education",
      });

      return;
    }

    if (!education1_institution.trim()) {
      setErr({
        error: "education1_institution",
        message: "Please enter your Secondary Institution",
      });

      return;
    }

    if (!education1_major?.trim()) {
      setErr({
        error: "education1_major",
        message: "Please enter your Secondary Major",
      });

      return;
    }
    if (!education1_passing_year) {
      setErr({
        error: "education1_passing_year",
        message: "Please select  Secondary Education passing year",
      });

      return;
    }

    if (!education2 || education2 === "Select education") {
      setErr({
        error: "education2",
        message: "Please select your Higher Secondary Education",
      });

      return;
    }

    if (!education2_institution.trim()) {
      setErr({
        error: "education2_institution",
        message: "Please enter your Higher Secondary Institution",
      });

      return;
    }

    if (!education2_major?.trim()) {
      setErr({
        error: "education2_passing_year",
        message: "Please enter your Higher Secondary Major",
      });

      return;
    }

    // if (!education3_passing_year) {
    //   setErr({
    //     error: "education1_passing_year",
    //     message: "Please select  Higher Secondary Major passing year",
    //   });

    //   return;
    // }

    // if (!education3) {
    //   setErr({
    //     error: "education3",
    //     message: "Please select your Graduate Education",
    //   });

    //   return;
    // }

    // if (!education3_institution.trim()) {
    //   setErr({
    //     error: "education3_institution",
    //     message: "Please enter your Graduate Institution",
    //   });

    //   return;
    // }

    // if (!education3_major.trim()) {
    //   setErr({
    //     error: "education3_major",
    //     message: "Please enter your Graduate Major",
    //   });

    //   return;
    // }

    // if (!education3_passing_year) {
    //   setErr({
    //     error: "education3_passing_year",
    //     message: "Please select your Graduate Passing Year",
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
        navigate("/register/ocupation");
      }
    } else {
      setLoading(false);
      navigate("/register/ocupation");
    }
  };

  // education 1 testing

  return (
    <>
      <RegisterLayout
        err={err}
        loading={loading}
        onContinueClicked={onContinueClicked}
      >
        <div
          className="container px-4 pb-2 flex-grow-1 overflow-auto"
          ref={scrollContainerRef}
        >
          <h1 className="card-title">Candidate’s Educational Background</h1>
          <h4 className="mt-5 mb-2" style={{ fontSize: "20px" }}>
            Secondary Education
          </h4>
          <Link
            onClick={onEducationSelectorClicked}
            to={"/register/education/type1"}
          >
            <div
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
              style={{
                fontFamily: "Inter",
                border: err?.error == "education1" ? "2px solid red" : "",
              }}
            >
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {education1Other
                    ? "Other"
                    : education1
                    ? education1
                    : "Select secondary education"}
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

          {education1Other && (
            <div className="form-floating my-4 text-muted  rounded-1">
              <input
                type="text"
                id="inputEducation1"
                value={education1}
                onChange={(e) => dispatch(setEducation1(e.target.value))}
                className="form-control border-0 rounded-1"
                placeholder="education1"
                aria-describedby="education1"
              />
              <label htmlFor="inputEducation1">Enter degree</label>
            </div>
          )}

          {/* <div
            className="form-floating my-4 text-muted  rounded-1"
            style={{
              fontFamily: "Inter",
              border:
                err?.error == "education1_institution" ? "2px solid red" : "",
            }}
          >
            <input
              onFocus={() => setErr()}
              type="text"
              id="inputInstitution1"
              value={education1_institution}
              onChange={(e) => {
                dispatch(setinstitution1(e.target.value));
                stoteRegisterValues({ education1_institution: e.target.value });
              }}
              className="form-control border-0 rounded-1"
              placeholder="institution1"
              aria-describedby="institution1"
            />
            <label htmlFor="inputInstitution1">
              Enter candidate's institution
            </label>
          </div> */}
          <RegInput
            type={"text"}
            value={education1_institution}
            fontFamily={"Inter"}
            onFocus={() => setErr({})}
            onChange={(e) => {
              dispatch(setinstitution1(e.target.value));
              stoteRegisterValues({ education1_institution: e.target.value });
            }}
            placeholder="institution1"
            label={" Enter candidate's institution"}
            error={err}
            errorType={"education1_institution"}
            id={"inputInstitution1"}
          />
          {/* <div
            className="form-floating my-4 text-muted  rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "education1_major" ? "2px solid red" : "",
            }}
          >
            <input
              onFocus={() => setErr()}
              type="text"
              id="inputMajor1"
              value={education1_major}
              //   onChange={onMajor1Change}
              onChange={(e) => {
                dispatch(setMajor1(e.target.value));
                stoteRegisterValues({ education1_major: e.target.value });
              }}
              className="form-control border-0 rounded-1"
              placeholder="major1"
              aria-describedby="major1"
            />
            <label htmlFor="inputMajor1">Enter major subject</label>
          </div> */}

          <RegInput
            type={"text"}
            value={education1_major}
            fontFamily={"Inter"}
            onFocus={() => setErr({})}
            onChange={(e) => {
              dispatch(setMajor1(e.target.value));
              stoteRegisterValues({ education1_major: e.target.value });
            }}
            placeholder="institution1"
            label={" Enter major subject"}
            error={err}
            errorType={"education1_major"}
            id={"inputInstitution1"}
          />

          <div className="row my-4 px-2  rounded-1">
            <div className="col-8 d-flex align-items-center">
              <label className="form-check-label px-2 text-muted">
                Select passing year
              </label>
            </div>
            <div className="col-4">
              <div className="dropup bg-white rounded-1">
                <button
                  type="button"
                  className="btn btn-outline-primary shadow-2 py-3 dropdown-toggle w-100 rounded-1 border-0"
                  data-bs-toggle="dropdown"
                  aria-expanded={year1Dropdown ? "true" : "false"}
                  onClick={toggleYear1Dropdown}
                  // onBlur={delayedYear1Dismiss}
                >
                  {education1_passing_year}
                </button>
                <ul
                  data-bs-popper
                  className={`dropdown-menu dropdown-menu-end w-100 text-end overflow-scroll shadow border-0 p-2${
                    year1Dropdown ? " show" : ""
                  }`}
                  style={{ maxHeight: 200 }}
                >
                  {passingYears.map((year, i) => (
                    <li key={i}>
                      <div
                        onClick={() => {
                          dispatch(setPassingYear1(year));
                          setYear1Dropdown(false);
                        }}
                        className={`btn btn-primary py-3 dropdown-item${
                          education1_passing_year === year ? " " : ""
                        }`}
                      >
                        {year}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <br />

          <h4 className="mt-4 mb-2" style={{ fontSize: "20px" }}>
            Higher Secondary Education
          </h4>
          <Link
            onClick={onEducationSelectorClicked}
            to={"/register/education/type2"}
          >
            <div
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
              style={{
                fontFamily: "Inter",
                border: err?.error === "education2" ? "2px solid red" : "",
              }}
            >
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {education2Other
                    ? "Other"
                    : education2
                    ? education2
                    : "Select higher secondary education"}
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

          {education2Other && (
            <div className="form-floating my-4 text-muted">
              <input
                type="text"
                id="inputEducation2"
                value={education2}
                onChange={(e) => dispatch(setEducation2(e.target.value))}
                // onChange={onEducation2Change}
                className="form-control border-0 rounded-1"
                placeholder="education2"
                aria-describedby="education2"
              />
              <label htmlFor="inputEducation2">Enter degree</label>
            </div>
          )}
          <div
            className="form-floating my-4 text-muted  rounded-1"
            style={{
              fontFamily: "Inter",
              border:
                err?.error === "education2_institution" ? "2px solid red" : "",
            }}
          >
            <input
              onFocus={() => setErr()}
              type="text"
              id="inputInstitution2"
              value={education2_institution}
              onChange={(e) => {
                dispatch(setinstitution2(e.target.value));
                stoteRegisterValues({ education2_institution: e.target.value });
              }}
              // onChange={onInstitution2Change}
              className="form-control border-0 rounded-1"
              placeholder="institution2"
              aria-describedby="institution2"
            />
            <label htmlFor="inputInstitution2">
              Enter candidate's institution
            </label>
          </div>
          <div
            className="form-floating my-4 text-muted  rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error === "education2_major" ? "2px solid red" : "",
            }}
          >
            <input
              onFocus={() => setErr()}
              type="text"
              id="inputMajor2"
              value={education2_major}
              onChange={(e) => {
                dispatch(setMajor2(e.target.value));
                stoteRegisterValues({ education1_major: e.target.value });
              }}
              // onChange={onMajor2Change}
              className="form-control border-0 rounded-1"
              placeholder="major2"
              aria-describedby="major2"
            />
            <label htmlFor="inputMajor2">Enter candidate's major subject</label>
          </div>
          <div className="row my-4 px-2">
            <div className="col-8 d-flex align-items-center">
              <label className="form-check-label px-2 text-muted">
                Select your passing year
              </label>
            </div>

            <div className="col-4">
              <div className="dropup bg-white rounded-1">
                <button
                  type="button"
                  className="btn btn-outline-primary shadow-2 py-3 dropdown-toggle w-100 rounded-1 border-0"
                  data-bs-toggle="dropdown"
                  aria-expanded={year2Dropdown ? "true" : "false"}
                  onClick={toggleYear2Dropdown}
                  // onBlur={delayedYear2Dismiss}
                >
                  {education2_passing_year}
                </button>
                <ul
                  data-bs-popper
                  className={`dropdown-menu dropdown-menu-end text-end w-100 overflow-scroll shadow border-0 p-2${
                    year2Dropdown ? " show" : ""
                  }`}
                  style={{ maxHeight: 200 }}
                >
                  {passingYears.map((year, i) => {
                    if (parseInt(year) > parseInt(education1_passing_year))
                      return (
                        <li key={i}>
                          <div
                            className={`btn btn-primary py-3 dropdown-item${
                              education2_passing_year === year ? " active" : ""
                            }`}
                            onClick={() => {
                              dispatch(setPassingYear2(year));
                              setYear2Dropdown(false);
                              stoteRegisterValues({
                                education2_passing_year: year,
                              });
                            }}
                          >
                            {year}
                          </div>
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <br />

          <h4 className="mt-4 mb-2" style={{ fontSize: "20px" }}>
            Graduate Education (Optional)
          </h4>
          <Link
            onClick={onEducationSelectorClicked}
            to={"/register/education/type3"}
          >
            <div
              className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
              style={{
                fontFamily: "Inter",
                border: err?.error == "education3" ? "2px solid red" : "",
              }}
            >
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {education3Other
                    ? "Other"
                    : education3
                    ? education3
                    : "Select graduate education"}
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

          {education3Other && (
            <div className="form-floating my-4 text-muted">
              <input
                type="text"
                id="inputEducation3"
                value={education3}
                onChange={(e) => dispatch(setEducation3(e.target.value))}
                // onChange={onEducation3Change}
                className="form-control border-0 rounded-1"
                placeholder="education3"
                aria-describedby="education3"
              />
              <label htmlFor="inputEducation3">Enter degree</label>
            </div>
          )}
          <div
            className="form-floating my-4 text-muted  rounded-1"
            style={{
              fontFamily: "Inter",
              border:
                err?.error == "education3_institution" ? "2px solid red" : "",
            }}
          >
            <input
              onFocus={() => setErr()}
              type="text"
              id="inputInstitution3"
              value={education3_institution}
              onChange={(e) => {
                dispatch(setinstitution3(e.target.value));
                stoteRegisterValues({ education3_institution: e.target.value });
              }}
              // onChange={onInstitution3Change}
              className="form-control border-0 rounded-1"
              placeholder="institution3"
              aria-describedby="institution3"
            />
            <label htmlFor="inputInstitution3">
              Enter candidate's institution
            </label>
          </div>

          <div
            className="form-floating my-4 text-muted  rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "education3_major" ? "2px solid red" : "",
            }}
          >
            <input
              onFocus={() => setErr()}
              type="text"
              id="inputMajor3"
              value={education3_major}
              onChange={(e) => {
                dispatch(setMajor3(e.target.value));
                stoteRegisterValues({ education3_major: e.target.value });
              }}
              // onChange={onMajor3Change}
              className="form-control border-0 rounded-1"
              placeholder="major3"
              aria-describedby="major3"
            />
            <label htmlFor="inputMajor3">Enter candidate's major/subject</label>
          </div>
          <div className="row my-4 px-2">
            <div className="col-8 d-flex align-items-center">
              <label className="form-check-label px-2 text-muted">
                Select your passing year
              </label>
            </div>

            <div className="col-4">
              <div className="dropup bg-white rounded-1">
                <button
                  type="button"
                  className="btn btn-outline-primary shadow-2 py-3 dropdown-toggle w-100 rounded-1 border-0"
                  data-bs-toggle="dropdown"
                  aria-expanded={year3Dropdown ? "true" : "false"}
                  onClick={toggleYear3Dropdown}
                  // onBlur={delayedYear3Dismiss}
                >
                  {education3_passing_year}
                </button>
                <ul
                  data-bs-popper
                  className={`dropdown-menu dropdown-menu-end text-end w-100 overflow-scroll shadow border-0 p-2${
                    year3Dropdown ? " show" : ""
                  }`}
                  style={{ maxHeight: 200 }}
                >
                  {passingYears.map((year, i) => {
                    if (parseInt(year) > parseInt(education2_passing_year))
                      return (
                        <li key={i}>
                          <div
                            className={`btn btn-primary py-3 dropdown-item${
                              education3_passing_year === year ? " active" : ""
                            }`}
                            onClick={() => {
                              dispatch(setPassingYear3(year));
                              setYear3Dropdown(false);

                              // stoteRegisterValues({
                              //   education2_passing_year: year,
                              // });
                            }}
                          >
                            {year}
                          </div>
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <br />

          <h4 className="mt-4 mb-2" style={{ fontSize: "20px" }}>
            Postgraduate Education (Optional)
          </h4>
          <Link
            // onClick={onEducationSelectorClicked}
            to={"/register/education/type4"}
          >
            <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {education4Other
                    ? "Other"
                    : education4
                    ? education4
                    : "Select postgraduate education"}
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

          {education4Other && (
            <div className="form-floating my-4 text-muted">
              <input
                type="text"
                id="inputEducation4"
                value={education4}
                onChange={(e) => dispatch(setEducation4(e.target.value))}
                // onChange={onEducation4Change}

                className="form-control border-0 rounded-1"
                placeholder="education4"
                aria-describedby="education4"
              />
              <label htmlFor="inputEducation4">Enter degree</label>
            </div>
          )}
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputInstitution4"
              value={education4_institution}
              onChange={(e) => {
                dispatch(setinstitution4(e.target.value));
                stoteRegisterValues({ education4_institution: e.target.value });
              }}
              // onChange={onInstitution4Change}
              className="form-control border-0 rounded-1"
              placeholder="institution4"
              aria-describedby="institution4"
            />
            <label htmlFor="inputInstitution4">
              Enter candidate's institution
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputMajor4"
              value={education4_major}
              onChange={(e) => {
                dispatch(setMajor4(e.target.value));
                setYear4Dropdown(false);
                stoteRegisterValues({ education4_major: e.target.value });
              }}
              // onChange={onMajor4Change}
              className="form-control border-0 rounded-1"
              placeholder="major4"
              aria-describedby="major4"
            />
            <label htmlFor="inputMajor4">Enter candidate's major/subject</label>
          </div>
          <div className="row my-4 px-2">
            <div className="col-8 d-flex align-items-center">
              <label className="form-check-label px-2 text-muted">
                Select your passing year
              </label>
            </div>

            <div className="col-4">
              <div className="dropup bg-white rounded-1">
                <button
                  type="button"
                  className="btn btn-outline-primary shadow-2 py-3 dropdown-toggle w-100 rounded-1 border-0"
                  data-bs-toggle="dropdown"
                  aria-expanded={year4Dropdown ? "true" : "false"}
                  onClick={toggleYear4Dropdown}
                  // onBlur={delayedYear4Dismiss}
                >
                  {education4_passing_year}
                </button>
                <ul
                  data-bs-popper
                  className={`dropdown-menu dropdown-menu-end text-end w-100 overflow-scroll shadow border-0 p-2${
                    year4Dropdown ? " show" : ""
                  }`}
                  style={{ maxHeight: 200 }}
                >
                  {passingYears.map((year, i) => {
                    if (parseInt(year) > parseInt(education3_passing_year))
                      return (
                        <li key={i}>
                          <div
                            className={`btn btn-primary py-3 dropdown-item${
                              education4_passing_year === year ? " active" : ""
                            }`}
                            onClick={() => {
                              dispatch(setPassingYear4(year));
                              setYear4Dropdown(false);
                              // stoteRegisterValues({
                              //   education2_passing_year: year,
                              // });
                            }}
                          >
                            {year}
                          </div>
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </RegisterLayout>
    </>
  );
}

export default Education;
