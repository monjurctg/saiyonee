import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import RegisterLayout from "../../components/layouts/RegisterLayout";

function Varification() {
  const navigator = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown((dropdown) => !dropdown);
  const delayedDismiss = () => setTimeout(() => setDropdown(false), 200);
  const [redirect, setRedirect] = useState("");
  let verification_type = "National ID";
  // let dropdown = "";
  let ID_TYPES = ["abc", "bcd", "xyz"];
  let verification_img1 = true;
  let verification_img2 = true;
  let onContinueClicked = () => {
    navigator("/register/success");
  };
  return (
    <>
      <RegisterLayout onContinueClicked={onContinueClicked}>
        <div className="container px-4 pb-2 flex-grow-1 overflow-auto">
          <div className="text-center">
            <h1>ID Verification</h1>
            <p className="text-muted mt-3 mb-2">
              (NID / Passport / Driving License / Birth Certificate)
            </p>
            <img src="/img/id-verification.svg" alt="back" />
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-primary shadow py-3 dropdown-toggle w-100 rounded-1"
              data-bs-toggle="dropdown"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={toggleDropdown}
              onBlur={delayedDismiss}>
              ID Type: {verification_type}
            </button>
            <ul
              className={`dropdown-menu w-100 p-2 shadow border-0 ${
                dropdown ? " show" : ""
              }`}>
              {ID_TYPES.map((idType, i) => (
                <li key={i}>
                  <div
                    className={`btn btn-primary py-3 dropdown-item${
                      verification_type === idType ? " active" : ""
                    }`}
                    // onClick={() => setVerificationType(idType)}
                  >
                    {idType}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-muted mt-5 mb-3">
            Please provide a Photo of the
            <span className="text-primary"> Front</span>{" "}
            {verification_type === "National ID" && (
              <>
                and <span className="text-primary">Back </span>
              </>
            )}
            side of your ID
          </p>
          <div className="d-flex my-4 justify-content-around">
            <div className="position-relative">
              <button className="btn btn-outline-primary border-0 shadow p-0 rounded-1">
                <label htmlFor="fileFrontSide" className="form-label mb-0">
                  <img
                    // src={
                    //   verification_img1
                    //     ? URL.createObjectURL(verification_img1)
                    //     : DEFAULT_IMG_URL
                    // }
                    src="/img/add-photo.svg"
                    alt="add id card"
                    style={{width: 136, height: 172}}
                    className="object-cover rounded-1"
                  />
                </label>
                <input
                  className="form-control d-none"
                  type="file"
                  accept="image/*"
                  id="fileFrontSide"
                  //   onChange={onFileChange(true)}
                />
              </button>
              {!verification_img1 && (
                <div
                  className="position-absolute text-center"
                  style={{bottom: "20%", left: 0, right: 0}}>
                  Front Side
                </div>
              )}
            </div>
            {verification_type === "National ID" && (
              <div className="position-relative">
                <button className="btn btn-outline-primary border-0 shadow p-0 rounded-1">
                  <label htmlFor="fileBackSide" className="form-label mb-0">
                    <img
                      //   src={
                      //     verification_img2
                      //       ? URL.createObjectURL(verification_img2)
                      //       : DEFAULT_IMG_URL
                      //   }
                      src="/img/add-photo.svg"
                      alt="add id card"
                      style={{width: 136, height: 172}}
                      className="object-cover rounded-1"
                    />
                  </label>
                  <input
                    className="form-control d-none"
                    type="file"
                    accept="image/*"
                    id="fileBackSide"
                    // onChange={onFileChange(false)}
                  />
                </button>
                {!verification_img2 && (
                  <div
                    className="position-absolute text-center"
                    style={{bottom: "20%", left: 0, right: 0}}>
                    Back Side
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </RegisterLayout>
    </>
  );
}

export default Varification;
