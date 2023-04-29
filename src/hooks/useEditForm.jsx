import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setEditData} from "../redux/slices/utilsSlice";
import UserServices from "../services/userServices";

const useEditForm = () => {
  const {editData: user} = useSelector((state) => state.utils);
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
    display_name: displayName || user?.display_name || "",
    full_name: full_name || user?.full_name || "",
    phone_number: phone_number || user?.phone_number || "",
    date_of_birth: date_of_birth || user?.date_of_birth || "",
    current_country: country || user?.current_country || "",
    current_city: city || user?.current_city || "",
    height_feet: height_feet || user?.height_feet || "",
    height_inches: height_inches || user?.height_inches || "",
    weight: weight || user?.weight || "",
    education2: education2 || user?.education2 || "",
    education2_institution:
      education2_institution || user?.education2_institution || "",
    education2_major: education2_major || user?.education2_major || "",
    education2_passing_year:
      passingYear2 || user?.education2_passing_year || "",
    education3: education3 || user?.education3 || "",
    education3_institution:
      education3_institution || user?.education3_institution || "",
    education3_major: education3_major || user?.education3_major || "",
    education3_passing_year:
      passingYear3 || user?.education3_passing_year || "",
    education4: education4 || user?.education4 || "",
    education4_institution:
      education4_institution || user?.education4_institution || "",
    education4_major: education4_major || user?.education4_major || "",
    education1: education1 || user?.education1 || "",
    education1_institution:
      education1_institution || user?.education1_institution || "",
    education1_major: education1_major || user?.education1_major || "",
    education4_passing_year:
      passingYear4 || user?.education4_passing_year || "",
    father_occupation: father_occupation || user?.father_occupation || "",
    mother_occupation: mother_occupation || user?.mother_occupation || "",
    number_of_brothers: number_of_brothers || user?.number_of_brothers || "",
    number_of_sisters: number_of_sisters || user?.number_of_sisters || "",
    marital_status: marital_status || user?.marital_status || "",
  });

  const dispatch = useDispatch();

  const handleUserInputChange = useCallback(
    (event) => {
      const {name, value} = event.target;
      setInputChange({...inputChange, [name]: value});
    },
    [inputChange]
  );

  return [inputChange, handleUserInputChange];
};

export default useEditForm;
