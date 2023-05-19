import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import RegisterLayout from "../../components/layouts/RegisterLayout";
import { setFamilyInformation } from "../../redux/slices/authSlices";
import AuthServices from "../../services/authServices";
import { stoteRegisterValues } from "../../utils/functions";
import RegInput from "../../components/InputType/RegInput";

function FamilyInfo() {
  let navigate = useNavigate();
  let socialToken = localStorage.getItem("social-token");
  const [loading, setLoading] = useState(false);
  let { pathname } = useLocation();

  const [err, setErr] = useState();

  const {
    father_home_district,
    father_occupation,
    mother_home_district,
    mother_occupation,
    number_of_brothers,
    number_of_sisters,
    email,
  } = useSelector((state) => state.auth);
  console.log("first", father_occupation);
  let onContinueClicked = async () => {
    // if (!familyInfo.father_occupation.trim())
    //   setErr(" Father's occupation cannot be blank");
    // else if (!familyInfo.father_home_district.trim())
    //   setErr(" Father's home district cannot be blank");
    // else if (!familyInfo.mother_occupation.trim())
    //   setErr(" Mother's occupation cannot be blank");
    // else if (!familyInfo.mother_home_district.trim())
    //   setErr("Mother's home district cannot be blank");
    // else {
    //   dispatch(setFamilyInformation(familyInfo));
    //   stoteRegisterValues(familyInfo);

    //   navigate("/register/varification");
    // }

    if (!familyInfo.father_occupation.trim()) {
      setErr({
        error: "father_occupation",
        message: "Father's Occupation cannot be blank!",
      });
      return;
    }

    if (!familyInfo.father_home_district.trim()) {
      setErr({
        error: "father_home_district",
        message: " Father's home district cannot be blank!",
      });
      return;
    }

    if (!familyInfo.mother_occupation.trim()) {
      setErr({
        error: "mother_occupation",
        message: "Mother's Occupation cannot be blank!",
      });
      return;
    }

    if (!familyInfo.mother_home_district.trim()) {
      setErr({
        error: "mother_home_district",
        message: "Mother's home district cannot be blank!",
      });
      return;
    }

    if (!socialToken) {
      let data = {
        email: email,
        page_name: pathname,
      };
      setLoading(true);

      let res = await AuthServices.checkPage(data);

      if (res.status === 200) {
        setLoading(false);
        dispatch(setFamilyInformation(familyInfo));
        stoteRegisterValues(familyInfo);

        navigate("/register/varification");
      }
    } else {
      setLoading(false);
      dispatch(setFamilyInformation(familyInfo));
      stoteRegisterValues(familyInfo);
      navigate("/register/varification");
    }
  };
  const dispatch = useDispatch();
  const [familyInfo, setFamilyInfo] = useState({
    father_home_district: father_home_district,
    father_occupation: father_occupation,
    mother_home_district: mother_home_district,
    mother_occupation: mother_occupation,
    number_of_brothers: number_of_brothers,
    number_of_sisters: number_of_sisters,
  });
  const handleUserInputChange = (e) => {
    console.log("e.target.value", e.target.value);
    const value = parseInt(e.target.value);
    if (value < 0) {
      if (e.target.name == "number_of_brothers") {
        setErr({
          error: "number_of_brothers",
          message: `Number of borthers cannot be negative!`,
        });
        return;
      } else if (e.target.name == "number_of_sisters") {
        setErr({
          error: "number_of_sisters",
          message: `Number of sisters cannot be negative!`,
        });
        return;
      }
    }
    setFamilyInfo({
      ...familyInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <RegisterLayout
        onContinueClicked={onContinueClicked}
        err={err}
        loading={loading}
      >
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1 className="card-title">Candidate's Family Information</h1>
          {/* <div
            className="form-floating my-4 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "father_occupation" ? "2px solid red" : "",
            }}
          >
            <input
              onFocus={() => setErr({})}
              type="text"
              id="inputFatherOccupation"
              name="father_occupation"
              value={familyInfo.father_occupation}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              placeholder="occupation"
              aria-describedby="occupation"
            />
            <label htmlFor="inputFatherOccupation">
              Enter Father's Occupation
            </label>
          </div> */}
          <RegInput
            onFocus={() => setErr({})}
            type="text"
            errorType={"father_occupation"}
            error={err}
            id="inputFatherOccupation"
            name="father_occupation"
            value={familyInfo.father_occupation}
            onChange={handleUserInputChange}
            fontFamily={"Inter"}
            placeholder="occupation"
            label={"  Enter Father's Occupation"}
          />
          <RegInput
            onFocus={() => setErr({})}
            type="text"
            errorType={"father_occupation"}
            error={err}
            id="inputFatherOccupation"
            name="father_home_district"
            value={familyInfo.father_home_district}
            onChange={handleUserInputChange}
            fontFamily={"Inter"}
            placeholder="homedistrict"
            label={" Enter Father's Home District"}
          />
          {/* <div
            className="form-floating my-4 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border:
                err?.error == "father_home_district" ? "2px solid red" : "",
            }}
          >
            <input
              onFocus={() => setErr({})}
              type="text"
              id="inputFatherHomeDistrict"
              name="father_home_district"
              value={familyInfo.father_home_district}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              placeholder="homedistrict"
              aria-describedby="homedistrict"
            />
            <label htmlFor="inputFatherHomeDistrict">
              Enter Father's Home District
            </label>
          </div> */}
          <div
            className="form-floating my-4 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border: err?.error == "mother_occupation" ? "2px solid red" : "",
            }}
          >
            <input
              type="text"
              id="inputMotherOccupation"
              name="mother_occupation"
              value={familyInfo.mother_occupation}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              placeholder="occupation"
              aria-describedby="occupation"
              onFocus={() => setErr({})}
            />
            <label htmlFor="inputMotherOccupation">
              Enter Mother's Occupation
            </label>
          </div>
          <div
            className="form-floating my-4 text-muted rounded-1"
            style={{
              fontFamily: "Inter",
              border:
                err?.error == "mother_home_district" ? "2px solid red" : "",
            }}
          >
            <input
              type="text"
              name="mother_home_district"
              id="inputMotherHomeDistrict"
              value={familyInfo.mother_home_district}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              placeholder="homedistrict"
              aria-describedby="homedistrict"
              onFocus={() => setErr({})}
            />
            <label htmlFor="inputMotherHomeDistrict">
              Enter Mother's Home District
            </label>
          </div>

          <p className="text-muted mt-5 mb-2">Number of brothers</p>
          <div
            className="row rounded-1"
            style={{
              fontFamily: "Inter",
              border:
                err?.error === "number_of_brothers" ? "2px solid red" : "",
            }}
          >
            <div className="col-2">
              <button
                onClick={() => {
                  if (familyInfo.number_of_brothers <= 0) return;
                  setFamilyInfo({
                    ...familyInfo,
                    number_of_brothers:
                      parseInt(familyInfo.number_of_brothers) - 1,
                  });
                }}
                className="btn btn-primary w-100 rounded-1 shadow p-3"
              >
                <strong>-</strong>
              </button>
            </div>
            <div className="col-8 px-4 rounded-1">
              <input
                type="number"
                name="number_of_brothers"
                id="inputBrotherCount"
                value={familyInfo.number_of_brothers}
                onChange={handleUserInputChange}
                onFocus={() => setErr({})}
                className="form-control border-0 rounded-1 p-3 text-center"
                // placeholder="50"
                min="0"
                aria-describedby="BrotherCount"
              />
            </div>
            <div className="col-2">
              <button
                onClick={() =>
                  setFamilyInfo({
                    ...familyInfo,
                    number_of_brothers:
                      parseInt(familyInfo.number_of_brothers) + 1,
                  })
                }
                className="btn btn-primary w-100 rounded-1 shadow p-3"
              >
                <strong>+</strong>
              </button>
            </div>
          </div>

          <p className="text-muted mt-4 mb-2">Number of sisters</p>
          <div
            className="row rounded-1 "
            style={{
              fontFamily: "Inter",
              border: err?.error === "number_of_sisters" ? "2px solid red" : "",
            }}
          >
            <div className="col-2">
              <button
                // onClick={decrementSisterCount}
                onClick={() => {
                  if (familyInfo.number_of_sisters <= 0) return;
                  setFamilyInfo({
                    ...familyInfo,
                    number_of_sisters:
                      parseInt(familyInfo.number_of_sisters) - 1,
                  });
                }}
                className="btn btn-primary w-100 rounded-1 shadow p-3"
              >
                <strong>-</strong>
              </button>
            </div>
            <div className="col-8 px-4">
              <input
                type="number"
                name="number_of_sisters"
                id="inputSisterCount"
                onFocus={() => setErr({})}
                value={familyInfo.number_of_sisters}
                onChange={handleUserInputChange}
                className="form-control border-0 rounded-1 p-3 text-center"
                // placeholder="50"
                min="0"
                aria-describedby="SisterCount"
              />
            </div>
            <div className="col-2">
              <button
                onClick={() =>
                  setFamilyInfo({
                    ...familyInfo,
                    number_of_sisters:
                      parseInt(familyInfo.number_of_sisters) + 1,
                  })
                }
                className="btn btn-primary w-100 rounded-1 shadow p-3"
              >
                <strong>+</strong>
              </button>
            </div>
          </div>
        </div>
      </RegisterLayout>
    </>
  );
}

export default FamilyInfo;
