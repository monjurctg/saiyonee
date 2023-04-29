import {validateAge} from "../../utils/functions";

const errors = {};
errors.validation = (setErr, inputChange, user, city) => {
  // console.log(inputChange.date_of_birth);
  //   alert(inputChange.date_of_birth);
  if (
    !inputChange.full_name.trim() ||
    inputChange.full_name.trim().length < 6
  ) {
    setErr({
      error: "full_name",
      message:
        "Full name is required and length should be minimum 6 characters",
    });
    return true;
  }
  if (
    !inputChange.display_name.trim() ||
    inputChange.display_name.trim().length < 3
  ) {
    setErr({
      error: "display_name",
      message:
        "Display name is required and length should be minimum 3 characters",
    });
    return true;
  }

  if (!validateAge(inputChange.date_of_birth, user?.gender)) {
    setErr({
      error: "dob",
      message:
        user?.gender.trim() === "Female".trim()
          ? "Your age must be 18 or 18 plus"
          : "Your age must be 21 or 21 plus",
    });
    return true;
  } else if (
    !inputChange.height_feet ||
    inputChange.height_feet > 8 ||
    inputChange.height_feet < 3
  ) {
    setErr({
      error: "ft",
      message: "Height cannot be less than 3 feet or greater than 8 feet",
    });
    return true;
  } else if (
    !inputChange.height_inches ||
    inputChange.height_inches >= 12 ||
    inputChange.height_inches < 0
  ) {
    setErr({
      error: "inc",
      message: "Height cannot be less than 0 inches or greater than 11 inches",
    });
    return true;
  }

  if (city === "Select city") {
    setErr({error: "city", message: "Please select city"});
    return true;
  }
  if (
    (inputChange.weight && inputChange.weight < 30) ||
    inputChange.weight >= 181
  ) {
    setErr({
      error: "weight",
      message: "weight cannot be less than 30 kg or greater then 180 kg",
    });
    return true;
  } else {
    return false;
  }
};

export default errors;
