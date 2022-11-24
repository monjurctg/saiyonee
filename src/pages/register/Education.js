import React from "react";
import {Link, useNavigate} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";

function Education() {
  const navigate = useNavigate();
  let education1Other = true;
  let education2Other = false;
  let education3Other = false;

  let education4Other = false;

  let education1_passing_year = 2012;
  let education2_passing_year = 2014;
  let education3_passing_year = 206;
  let education4_passing_year = 2018;
  let err = "";

  let passingYears = ["2012", "2013", "2014", "2016", "2018"];
  let year1Dropdown = true;
  let year2Dropdown = false;

  let year3Dropdown = false;

  let year4Dropdown = false;

  let onContinueClicked = () => {
    navigate("/register/ocupation");
  };

  return (
    <>
      <RegisterLayout err={err} onContinueClicked={onContinueClicked}>
        <div
          className="container px-4 pb-2 flex-grow-1 overflow-auto"
          // ref={scrollContainerRef}
        >
          <h1>Candidate’s Educational Background</h1>
          <h4 className="mt-5 mb-2">Secondary Education</h4>
          <Link
            // onClick={onEducationSelectorClicked}
            to={"/register/education/type1"}>
            <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  another
                  {/* {education1Other
                    ? "Other"
                    : education1
                    ? education1
                    : "Select secondary education"} */}
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
            <div className="form-floating my-4 text-muted">
              <input
                type="text"
                id="inputEducation1"
                // value={education1}
                // onChange={onEducation1Change}
                className="form-control border-0 rounded-1"
                placeholder="education1"
                aria-describedby="education1"
              />
              <label htmlFor="inputEducation1">Enter degree</label>
            </div>
          )}

          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputInstitution1"
              //   value={education1_institution}
              //   onChange={onInstitution1Change}
              className="form-control border-0 rounded-1"
              placeholder="institution1"
              aria-describedby="institution1"
            />
            <label htmlFor="inputInstitution1">
              Enter candidate's institution
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputMajor1"
              //   value={education1_major}
              //   onChange={onMajor1Change}
              className="form-control border-0 rounded-1"
              placeholder="major1"
              aria-describedby="major1"
            />
            <label htmlFor="inputMajor1">Enter major/subject</label>
          </div>

          <div className="row my-4 px-2">
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
                  //   aria-expanded={year1Dropdown ? "true" : "false"}
                  //   onClick={toggleYear1Dropdown}
                  //                   onBlur={delayedYear1Dismiss}
                >
                  {/* {education1_passing_year} */}
                  2012
                </button>
                <ul
                  data-bs-popper
                  className={`dropdown-menu dropdown-menu-end w-100 text-end overflow-scroll shadow border-0 p-2${
                    year1Dropdown ? " show" : ""
                  }`}
                  style={{maxHeight: 200}}>
                  {passingYears.map((year, i) => (
                    <li key={i}>
                      <div
                        className={`btn btn-primary py-3 dropdown-item${
                          education1_passing_year === year ? " active" : ""
                        }`}
                        //   onClick={() => setEducation1PassingYear(year)}
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

          <h4 className="mt-4 mb-2">Higher Secondary Education</h4>
          <Link
            // onClick={onEducationSelectorClicked}
            to={"/register/education/type2"}>
            <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {/* {education2Other
                    ? "Other"
                    : education2
                    ? education2
                    : "Select higher secondary education"} */}
                  other
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
                // value={education2}
                // onChange={onEducation2Change}
                className="form-control border-0 rounded-1"
                placeholder="education2"
                aria-describedby="education2"
              />
              <label htmlFor="inputEducation2">Enter degree</label>
            </div>
          )}
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputInstitution2"
              // value={education2_institution}
              // onChange={onInstitution2Change}
              className="form-control border-0 rounded-1"
              placeholder="institution2"
              aria-describedby="institution2"
            />
            <label htmlFor="inputInstitution2">
              Enter candidate's institution
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputMajor2"
              // value={education2_major}
              // onChange={onMajor2Change}
              className="form-control border-0 rounded-1"
              placeholder="major2"
              aria-describedby="major2"
            />
            <label htmlFor="inputMajor2">Enter candidate's major/subject</label>
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
                  // onClick={toggleYear2Dropdown}
                  // onBlur={delayedYear2Dismiss}
                >
                  {education2_passing_year}
                </button>
                <ul
                  data-bs-popper
                  className={`dropdown-menu dropdown-menu-end text-end w-100 overflow-scroll shadow border-0 p-2${
                    year2Dropdown ? " show" : ""
                  }`}
                  style={{maxHeight: 200}}>
                  {passingYears.map((year, i) => (
                    <li key={i}>
                      <div
                        className={`btn btn-primary py-3 dropdown-item${
                          education2_passing_year === year ? " active" : ""
                        }`}
                        // onClick={() => setEducation2PassingYear(year)}
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

          <h4 className="mt-4 mb-2">Graduate Education</h4>
          <Link
            // onClick={onEducationSelectorClicked}
            to={"/register/education/type3"}>
            <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {/* {education3Other
                    ? "Other"
                    : education3
                    ? education3
                    : "Select graduate education"} */}
                  another
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
                // value={education3}
                // onChange={onEducation3Change}
                className="form-control border-0 rounded-1"
                placeholder="education3"
                aria-describedby="education3"
              />
              <label htmlFor="inputEducation3">Enter degree</label>
            </div>
          )}
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputInstitution3"
              // value={education3_institution}
              // onChange={onInstitution3Change}
              className="form-control border-0 rounded-1"
              placeholder="institution3"
              aria-describedby="institution3"
            />
            <label htmlFor="inputInstitution3">
              Enter candidate's institution
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputMajor3"
              // value={education3_major}
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
                  // onClick={toggleYear3Dropdown}
                  // onBlur={delayedYear3Dismiss}
                >
                  {education3_passing_year}
                </button>
                <ul
                  data-bs-popper
                  className={`dropdown-menu dropdown-menu-end text-end w-100 overflow-scroll shadow border-0 p-2${
                    year3Dropdown ? " show" : ""
                  }`}
                  style={{maxHeight: 200}}>
                  {passingYears.map((year, i) => (
                    <li key={i}>
                      <div
                        className={`btn btn-primary py-3 dropdown-item${
                          education3_passing_year === year ? " active" : ""
                        }`}
                        // onClick={() => setEducation3PassingYear(year)}
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

          <h4 className="mt-4 mb-2">Postgraduate Education (Optional)</h4>
          <Link
            // onClick={onEducationSelectorClicked}
            to={"/register/education/type4"}>
            <div className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2">
              <div className="col-10">
                <label className="form-check-label bg-white px-2 text-body">
                  {/* {education4Other
                    ? "Other"
                    : education4
                    ? education4
                    : "Select postgraduate education"} */}
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
                // value={education4}
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
              // value={education4_institution}
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
              // value={education4_major}
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
                  // onClick={toggleYear4Dropdown}
                  // onBlur={delayedYear4Dismiss}
                >
                  {education4_passing_year}
                </button>
                <ul
                  data-bs-popper
                  className={`dropdown-menu dropdown-menu-end text-end w-100 overflow-scroll shadow border-0 p-2${
                    year4Dropdown ? " show" : ""
                  }`}
                  style={{maxHeight: 200}}>
                  {passingYears.map((year, i) => (
                    <li key={i}>
                      <div
                        className={`btn btn-primary py-3 dropdown-item${
                          education4_passing_year === year ? " active" : ""
                        }`}
                        // onClick={() => setEducation4PassingYear(year)}
                      >
                        {year}
                      </div>
                    </li>
                  ))}
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
