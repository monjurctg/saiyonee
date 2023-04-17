import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
  setEditProfile,
  setEdu2PassYear,
} from "../../redux/slices/editProfileslice";

function Education2({
  from,
  inputChange,
  err,
  handleUserInputChange,
  passingYears,
  user,
}) {
  const {passingYear2} = useSelector((state) => state.editProfile);

  const dispatch = useDispatch();
  const [year2Dropdown, setYear2Dropdown] = useState(false);
  const toggleYear2Dropdown = () => setYear2Dropdown((dropdown) => !dropdown);
  const delayedYear2Dismiss = () =>
    setTimeout(() => setYear2Dropdown(false), 200);
  return (
    <div>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Higher Secondary Education
      </p>
      <div className="form-floating text-muted rounded-1">
        <Link
          onClick={() => dispatch(setEditProfile(inputChange))}
          // onClick={onEducationSelectorClicked}
          to={"/editProfile/edu2"}>
          <div
            className="row my-4 align-items-center bg-white px-2 py-4 rounded-1 shadow-2"
            style={{
              fontFamily: "Inter",
              border: err?.error == "education2" ? "2px solid red" : "",
            }}>
            <div className="col-10">
              <label className="form-check-label bg-white px-2 text-body">
                {inputChange?.education2 ?? "  Undergraduate Education Type"}
              </label>
            </div>
            <div className="col-2 d-flex justify-content-end pe-3">
              <img src="/img/back-icon.svg" alt="next" className="rotate-180" />
            </div>
          </div>
        </Link>
        {/* 
        <label style={{fontFamily: "Inter"}} htmlFor="">
          Secondary Education Type
        </label> */}
      </div>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Higher Secondary Education Institute
      </p>
      <div
        className="form-floating my-4 text-muted  rounded-1"
        style={{
          fontFamily: "Inter",
          border: err?.error == "education2_institution" ? "2px solid red" : "",
        }}>
        <input
          // onFocus={() => setErr()}
          type="text"
          id="inputInstitution1"
          name="education2_institution"
          value={inputChange.education2_institution}
          style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
          onChange={handleUserInputChange}
          className="form-control border-0 rounded-1"
          placeholder="Undergraduate candidate's institution"
          aria-describedby="institution1"
        />
        {/* <label htmlFor="inputInstitution1">Enter candidate's institution</label> */}
      </div>
      <p className="text-muted text-start mt-4" style={{fontFamily: "Inter"}}>
        Higher Secondary Education Major
      </p>
      <div
        className="form-floating my-4 text-muted  rounded-1"
        style={{
          fontFamily: "Inter",
          border: err?.error == "education2_major" ? "2px solid red" : "",
        }}>
        <input
          // onFocus={() => setErr()}
          type="text"
          id="inputMajor1"
          name="education2_major"
          value={inputChange.education2_major}
          onChange={handleUserInputChange}
          style={{fontFamily: "Inter", paddingTop: 0, paddingBottom: 0}}
          className="form-control border-0 rounded-1"
          placeholder="Undergraduate major subject"
          aria-describedby="major1"
        />
        {/* <label htmlFor="inputMajor1">Enter major subject</label> */}
      </div>

      <div className="row my-4 px-2  rounded-1">
        <div className="col-8 d-flex align-items-center">
          <label className="form-check-label px-2 text-muted">
            Select passing year
          </label>
        </div>
        <div className="col-4">
          <div className="dropup bg-white rounded-1">
            {/* <button
              type="button"
              className="btn btn-outline-primary shadow-2 py-3 dropdown-toggle w-100 rounded-1 border-0"
              data-bs-toggle="dropdown"
              aria-expanded={year2Dropdown ? "true" : "false"}
              onClick={toggleYear2Dropdown}
              // onBlur={delayedYear1Dismiss}
            >
              {passingYear2 ? passingYear2 : user?.education2_passing_year}
            </button> */}
            <button
              type="button"
              className="btn btn-outline-primary shadow-2 py-3 dropdown-toggle w-100 rounded-1 border-0"
              data-bs-toggle="dropdown"
              aria-expanded={year2Dropdown ? "true" : "false"}
              onClick={toggleYear2Dropdown}
              // onBlur={delayedYear2Dismiss}
            >
              {passingYear2 ? passingYear2 : user?.education2_passing_year}
            </button>
            <ul
              data-bs-popper
              className={`dropdown-menu dropdown-menu-end w-100 text-end overflow-scroll shadow border-0 p-2${
                year2Dropdown ? " show" : ""
              }`}
              style={{maxHeight: 200}}>
              {passingYears.map((year, i) => {
                if (parseInt(year) > parseInt(user?.education1_passing_year))
                  return (
                    <li key={i}>
                      <div
                        className={`btn btn-primary py-3 dropdown-item${
                          passingYear2 === year ? " active" : ""
                        }`}
                        onClick={() => {
                          dispatch(setEdu2PassYear(year));
                          setYear2Dropdown(false);
                        }}>
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
  );
}

export default Education2;
