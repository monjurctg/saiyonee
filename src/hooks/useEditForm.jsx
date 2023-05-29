import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditData, setIsEditNotSave } from "../redux/slices/utilsSlice";
import UserServices from "../services/userServices";
import { setEditProfile } from "../redux/slices/editProfileslice";
import { useNavigate } from "react-router-dom";
import errors from "../components/errors/commonError";

const useEditForm = () => {
  const { editData: user } = useSelector((state) => state.utils);
  const {
    country,
    city,
    displayName,
    height_inches,
    height_feet,
    weight,
    father_occupation,
    mother_occupation,
    number_of_brothers,
    number_of_sisters,
    passingYear3,
    passingYear4,

    education3_institution,
    education3_major,
    education2_institution,
    education1_institution,
    education1_major,

    education2_major,
    passingYear2,
    education1,

    education2,
    education3,
    education4,
    education4_passing_year,
    education4_institution,
    education4_major,
    marital_status,
    religion,
    full_name,
    phone_number,
    date_of_birth,
  } = useSelector((state) => state.editProfile);

  const [inputChange, setInputChange] = useState({
    display_name: displayName || "",
    full_name: full_name || "",
    phone_number: phone_number || "",
    date_of_birth: date_of_birth || "",
    current_country: country || "",
    current_city: city || "",
    height_feet: height_feet || "",
    height_inches: height_inches || "",
    weight: weight || "",
    education2: education2 || "",
    education2_institution: education2_institution || "",
    education2_major: education2_major || "",
    education2_passing_year: passingYear2 || "",
    education3: education3 || "",
    education3_institution: education3_institution || "",
    education3_major: education3_major || "",
    education3_passing_year: passingYear3 || "",
    education4: education4 || "",
    education4_institution: education4_institution || "",
    education4_major: education4_major || "",
    education1: education1 || "",
    education1_institution: education1_institution || "",
    education1_major: education1_major || "",
    education4_passing_year: passingYear4 || "",
    father_occupation: father_occupation || "",
    mother_occupation: mother_occupation || "",
    number_of_brothers: number_of_brothers || "",
    number_of_sisters: number_of_sisters || "",
    marital_status: marital_status || "",
  });

  const dispatch = useDispatch();

  const handleUserInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      dispatch(setIsEditNotSave(true));

      setInputChange({ ...inputChange, [name]: value });
    },
    [inputChange]
  );
  const navigate = useNavigate();

  //   const handlePopstate = (event) => {
  //     if (event.target.location.pathname === "/settings") {
  //       // console.log(inputChange);
  //       setTimeout(() => {
  //         dispatch(setEditProfile(inputChange));

  //       }, 1000)
  //   };
  // }

  return [inputChange, handleUserInputChange];
};

export default useEditForm;
