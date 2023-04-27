import {useCallback, useState} from "react";
import {useSelector} from "react-redux";

const useEditForm = () => {
  const {editData: user} = useSelector((state) => state.utils);

  const [inputChange, setInputChange] = useState({
    display_name: user?.display_name || "",
    full_name: user?.full_name || "",
    phone_number: user?.phone_number || "",
    date_of_birth: user?.date_of_birth || "",
    current_country: user?.current_country || "",
    current_city: user?.current_city || "",
    height_feet: user?.height_feet || "",
    height_inches: user?.height_inches || "",
    weight: user?.weight || "",
    education2: user?.education2 || "",
    education2_institution: user?.education2_institution || "",
    education2_major: user?.education2_major || "",
    passingYear2: user?.passingYear2 || "",
    education3: user?.education3 || "",
    education3_institution: user?.education3_institution || "",
    education3_major: user?.education3_major || "",
    education3_passing_year: user?.education3_passing_year || "",
    education4: user?.education4 || "",
    education4_institution: user?.education4_institution || "",
    education4_major: user?.education4_major || "",
    education4_passing_year: user?.education4_passing_year || "",
    father_occupation: user?.father_occupation || "",
    mother_occupation: user?.mother_occupation || "",
    number_of_brothers: user?.number_of_brothers || "",
    number_of_sisters: user?.number_of_sisters || "",
    marital_status: user?.marital_status || "",
  });

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