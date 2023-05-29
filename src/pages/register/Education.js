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
import EducationLayout from "../../components/layouts/EducationLayout";
import PassingYearDropdown from "../../components/editProfile/PassingYearDropdown ";
import { setEdu1PassYear } from "../../redux/slices/editProfileslice";

let scrollPos = 0;

function Education() {
  const navigate = useNavigate();
  let socialToken = localStorage.getItem("social-token");
  const { date_of_birth } = useSelector((state) => state.auth);
  const scrollContainerRef = useRef();
  let { pathname } = useLocation();
  const onEducationSelectorClicked = useCallback((path) => {
    navigate(path)
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

  // const [year1Dropdown, setYear1Dropdown] = useState(false);
  // const toggleYear1Dropdown = () => setYear1Dropdown((dropdown) => !dropdown);
  // const delayedYear1Dismiss = () =>
  //   setTimeout(() => setYear1Dropdown(false), 200);

  // const [year2Dropdown, setYear2Dropdown] = useState(false);
  // const toggleYear2Dropdown = () => setYear2Dropdown((dropdown) => !dropdown);
  // const delayedYear2Dismiss = () =>
  //   setTimeout(() => setYear2Dropdown(false), 200);

  const [year3Dropdown, setYear3Dropdown] = useState(false);
  const toggleYear3Dropdown = () => setYear3Dropdown((dropdown) => !dropdown);

  const [year4Dropdown, setYear4Dropdown] = useState(false);
  const toggleYear4Dropdown = () => setYear4Dropdown((dropdown) => !dropdown);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dateOfBirthYear = new Date(date_of_birth).getFullYear() + 10;

  const passingYears = Array.from(
    new Array(new Date().getFullYear() - dateOfBirthYear + 1)
  ).map((_, i) => dateOfBirthYear + i);

  //dis alert(dateOfBirthYear);
  useEffect(()=>{
 dispatch(setEdu1PassYear(dateOfBirthYear))
//  console.log(dateOfBirthYear)

  },[])

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

    if (!education2_passing_year) {
      setErr({
        error: "education2_passing_year",
        message: "Please select Higher Secondary Education passing year",
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

  let education1Element = (
    <EducationLayout
      onEducationSelectorClicked={()=>onEducationSelectorClicked("/register/education/type1")}
      // to={""}
      err={err}
      // label={inputChange.education1}
      type={"education1"}
      label={
        education1Other
          ? "Other"
          : education1
          ? education1
          : "Select secondary education"
      }
      title=" Secondary  Education"
    >
      <RegInput
        type={"text"}
        value={education1_institution}
        fontFamily={"Inter"}
        onFocus={() => setErr({})}
        onChange={(e) => {
          dispatch(setinstitution1(e.target.value));
        }}
        placeholder="institution1"
        label={" Enter candidate's institution"}
        error={err}
        errorType={"education1_institution"}
        id={"inputInstitution1"}
      />

      <RegInput
        type={"text"}
        value={education1_major}
        fontFamily={"Inter"}
        onFocus={() => setErr({})}
        onChange={(e) => {
          dispatch(setMajor1(e.target.value));
        }}
        placeholder="institution1"
        label={" Enter major subject"}
        error={err}
        errorType={"education1_major"}
        id={"inputInstitution1"}
      />
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

      <PassingYearDropdown
        passingYear={education1_passing_year}
        error={err}
        setErr={setErr}

        errorType={"education1_passing_year"}
        onChange={(year) => {
          dispatch(setPassingYear1(year));
          dispatch(setPassingYear2(" "));
          dispatch(setPassingYear3(" "));
          dispatch(setPassingYear4(" "));
        }}
        userPassingYear={education1_passing_year}
        previousPassingYear={dateOfBirthYear || date_of_birth}
        maxHeight={200}
      />
    </EducationLayout>
  );

  let education2Element = (
    <EducationLayout
    onEducationSelectorClicked={()=>onEducationSelectorClicked("/register/education/type2")}
      // to={"/register/education/type2"}
      err={err}
      // label={inputChange.education1}
      type={"education2"}
      label={
        education2Other
          ? "Other"
          : education2
          ? education2
          : "Select Higher Secondary Education"
      }
      title=" Higher Secondary Education"
    >
      <RegInput
        type={"text"}
        value={education2_institution}
        fontFamily={"Inter"}
        onFocus={() => setErr({})}
        onChange={(e) => {
          dispatch(setinstitution2(e.target.value));
        }}
        placeholder="institution2"
        label={" Enter candidate's institution"}
        error={err}
        errorType={"education2_institution"}
        id={"inputInstitution2"}
      />

      <RegInput
        type={"text"}
        value={education2_major}
        fontFamily={"Inter"}
        onFocus={() => setErr({})}
        onChange={(e) => {
          dispatch(setMajor2(e.target.value));
        }}
        placeholder="institution"
        label={" Enter major subject"}
        error={err}
        errorType={"education1_major"}
        id={"inputInstitution1"}
      />

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

      <PassingYearDropdown
        passingYear={education2_passing_year}
        error={err}
        errorType={"education2_passing_year"}
        onChange={(year) => {
          dispatch(setPassingYear2(year));
          dispatch(setPassingYear3(""));
          dispatch(setPassingYear4(""));
        }}
        setErr={setErr}
        userPassingYear={education2_passing_year}
        previousPassingYear={education1_passing_year}
        maxHeight={200}
      />
    </EducationLayout>
  );

  let education3Element = (
    <EducationLayout
    onEducationSelectorClicked={()=>onEducationSelectorClicked("/register/education/type3")}
      // to={"/register/education/type3"}
      err={err}
      // label={inputChange.education1}
      type={"education3"}
      label={
        education3Other
          ? "Other"
          : education3
          ? education3
          : "Select graduate education"
      }
      title=" Graduate Education"
    >
      <RegInput
        type={"text"}
        value={education3_institution}
        fontFamily={"Inter"}
        onFocus={() => setErr({})}
        onChange={(e) => {
          dispatch(setinstitution3(e.target.value));
        }}
        placeholder="institution"
        label={" Enter candidate's institution"}
        error={err}
        errorType={"education3_institution"}
        id={"inputInstitution3"}
      />

      <RegInput
        type={"text"}
        value={education3_major}
        fontFamily={"Inter"}
        onFocus={() => setErr({})}
        onChange={(e) => {
          dispatch(setMajor3(e.target.value));
        }}
        placeholder="Major"
        label={" Enter major subject"}
        error={err}
        errorType={"education3_major"}
        id={"inputInstitution3"}
      />

      {education3Other && (
        <div className="form-floating my-4 text-muted">
          <input
            type="text"
            id="inputEducation3"
            value={education3}
            onChange={(e) => dispatch(setEducation3(e.target.value))}
            // onChange={onEducation2Change}
            className="form-control border-0 rounded-1"
            placeholder="education3"
            aria-describedby="education3"
          />
          <label htmlFor="inputEducation3">Enter degree</label>
        </div>
      )}

      <PassingYearDropdown
        passingYear={education3_passing_year}
        error={err}
        errorType={"education3_passing_year"}
        onChange={(year) => {
          dispatch(setPassingYear3(year));
          // dispatch(setPassingYear3(""));
          dispatch(setPassingYear4(""));
        }}
        setErr={setErr}

        userPassingYear={education3_passing_year}
        previousPassingYear={education2_passing_year}
        maxHeight={200}
      />
    </EducationLayout>
  );

  let education4Element = (
    <EducationLayout
    onEducationSelectorClicked={()=>onEducationSelectorClicked("/register/education/type4")}
      // to={"/register/education/type4"}
      err={err}
      // label={inputChange.education1}
      type={"education4"}
      label={
        education4Other
          ? "Other"
          : education4
          ? education4
          : "Select Postgraduate education"
      }
      title=" Postgraduate Education"
    >
      <RegInput
        type={"text"}
        value={education4_institution}
        fontFamily={"Inter"}
        onFocus={() => setErr({})}
        onChange={(e) => {
          dispatch(setinstitution4(e.target.value));
        }}
        placeholder="institution"
        label={" Enter candidate's institution"}
        error={err}
        errorType={"education4_institution"}
        id={"inputInstitution4"}
      />

      <RegInput
        type={"text"}
        value={education4_major}
        fontFamily={"Inter"}
        onFocus={() => setErr({})}
        onChange={(e) => {
          dispatch(setMajor4(e.target.value));
        }}
        placeholder="Major"
        label={" Enter major subject"}
        error={err}
        errorType={"education4_major"}
        id={"inputInstitution4"}
      />

      {education4Other && (
        <div className="form-floating my-4 text-muted">
          <input
            type="text"
            id="inputEducation4"
            value={education4}
            onChange={(e) => dispatch(setEducation4(e.target.value))}
            // onChange={onEducation2Change}
            className="form-control border-0 rounded-1"
            placeholder="education4"
            aria-describedby="education4"
          />
          <label htmlFor="inputEducation2">Enter degree</label>
        </div>
      )}

      <PassingYearDropdown
        passingYear={education4_passing_year}
        error={err}
        errorType={"education4_passing_year"}
        onChange={(year) => {
          dispatch(setPassingYear4(year));
          // dispatch(setPassingYear3(""));
          // dispatch(setPassingYear4(""));
        }}
        userPassingYear={education4_passing_year}
        previousPassingYear={education3_passing_year}
        maxHeight={200}
        setErr={setErr}

      />
    </EducationLayout>
  );

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

          <h4 className="mt-4 mb-2" style={{ fontSize: "20px" }}>
            Secondary Education
          </h4>

          {education1Element}

          {/* <br /> */}

          <h4 className="mt-4 mb-2" style={{ fontSize: "20px" }}>
            Higher Secondary Education
          </h4>
          {education2Element}

          {/* <br /> */}

          <h4 className="mt-4 mb-2" style={{ fontSize: "20px" }}>
            Graduate Education (Optional)
          </h4>
          {education3Element}

          {/* <br /> */}

          <h4 className="mt-4 mb-2" style={{ fontSize: "20px" }}>
            Postgraduate Education (Optional)
          </h4>
          {education4Element}
        </div>
      </RegisterLayout>
    </>
  );
}

export default Education;
