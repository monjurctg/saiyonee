import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import RegisterLayout from "../../components/layouts/RegisterLayout";
import {setFamilyInformation} from "../../redux/slices/authSlices";
import { stoteRegisterValues } from "../../utils/functions";

function FamilyInfo() {
  let navigate = useNavigate();
  const {
    father_home_district,
    father_occupation,
    mother_home_district,
    mother_occupation,
    number_of_brothers,
    number_of_sisters,
  } = useSelector((state) => state.auth);
  let err = "";
  let onContinueClicked = () => {
    dispatch(setFamilyInformation(familyInfo));
    stoteRegisterValues(familyInfo)

    navigate("/register/varification");
  };
  const dispatch = useDispatch();
  const [familyInfo, setFamilyInfo] = useState({
    father_home_district: "",
    father_occupation: "",
    mother_home_district: "",
    mother_occupation: "",
    number_of_brothers: 1,
    number_of_sisters: 1,
  });
  const handleUserInputChange = (e) => {
    setFamilyInfo({
      ...familyInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <RegisterLayout onContinueClicked={onContinueClicked} err={err}>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <h1>Candidate's Family Information</h1>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputFatherOccupation"
              name="father_occupation"
              value={familyInfo.father_occupation || father_occupation}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              placeholder="occupation"
              aria-describedby="occupation"
            />
            <label htmlFor="inputFatherOccupation">
              Enter Father's Occupation
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputFatherHomeDistrict"
              name="father_home_district"
              value={familyInfo.father_home_district || father_home_district}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              placeholder="homedistrict"
              aria-describedby="homedistrict"
            />
            <label htmlFor="inputFatherHomeDistrict">
              Enter Father's Home District
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              id="inputMotherOccupation"
              name="mother_occupation"
              value={familyInfo.mother_occupation || mother_occupation}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              placeholder="occupation"
              aria-describedby="occupation"
            />
            <label htmlFor="inputMotherOccupation">
              Enter Mother's Occupation
            </label>
          </div>
          <div className="form-floating my-4 text-muted">
            <input
              type="text"
              name="mother_home_district"
              id="inputMotherHomeDistrict"
              value={familyInfo.mother_home_district || mother_home_district}
              onChange={handleUserInputChange}
              className="form-control border-0 rounded-1"
              placeholder="homedistrict"
              aria-describedby="homedistrict"
            />
            <label htmlFor="inputMotherHomeDistrict">
              Enter Mother's Home District
            </label>
          </div>

          <p className="text-muted mt-5 mb-2">Number of brothers</p>
          <div className="row">
            <div className="col-2">
              <button
                onClick={() => {
                  if (familyInfo.number_of_brothers <= 0) return;
                  setFamilyInfo({
                    ...familyInfo,
                    number_of_brothers: familyInfo.number_of_brothers - 1,
                  });
                }}
                className="btn btn-primary w-100 rounded-1 shadow p-3">
                <strong>-</strong>
              </button>
            </div>
            <div className="col-8 px-4">
              <input
                type="number"
                name="number_of_brothers"
                id="inputBrotherCount"
                value={familyInfo.number_of_brothers || number_of_brothers}
                onChange={handleUserInputChange}
                className="form-control border-0 rounded-1 p-3 text-center"
                // placeholder="50"
                aria-describedby="BrotherCount"
              />
            </div>
            <div className="col-2">
              <button
                onClick={() =>
                  setFamilyInfo({
                    ...familyInfo,
                    number_of_brothers: familyInfo.number_of_brothers + 1,
                  })
                }
                className="btn btn-primary w-100 rounded-1 shadow p-3">
                <strong>+</strong>
              </button>
            </div>
          </div>

          <p className="text-muted mt-4 mb-2">Number of sisters</p>
          <div className="row">
            <div className="col-2">
              <button
                // onClick={decrementSisterCount}
                onClick={() => {
                  if (familyInfo.number_of_sisters <= 0) return;
                  setFamilyInfo({
                    ...familyInfo,
                    number_of_sisters: familyInfo.number_of_sisters - 1,
                  });
                }}
                className="btn btn-primary w-100 rounded-1 shadow p-3">
                <strong>-</strong>
              </button>
            </div>
            <div className="col-8 px-4">
              <input
                type="number"
                name="number_of_sisters"
                id="inputSisterCount"
                value={familyInfo.number_of_sisters}
                onChange={handleUserInputChange}
                className="form-control border-0 rounded-1 p-3 text-center"
                placeholder="50"
                aria-describedby="SisterCount"
              />
            </div>
            <div className="col-2">
              <button
                onClick={() =>
                  setFamilyInfo({
                    ...familyInfo,
                    number_of_sisters: familyInfo.number_of_sisters + 1,
                  })
                }
                className="btn btn-primary w-100 rounded-1 shadow p-3">
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
