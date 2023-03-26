import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  religion: "",
  employType: "",
  displayName: "",
  maritalStatus: "",
  country: "",
  city: "",
  gender: "",
  age_from: "",
  age_to: "",
  height_feet: "",
  height_inches: "",
  weight: "",
  father_occupation: "",
  mother_occupation: "",
  number_of_brothers: "",
  number_of_sisters: "",
  passingYear1: "",
  passingYear2: "",
  education1: "",
  education2: "",
};

const EditProfileSlice = createSlice({
  name: "edit_profile",
  initialState,

  reducers: {
    setEditProfileReligion: (state, {payload}) => {
      state.religion = payload;
    },
    setEditProfileEmployType: (state, {payload}) => {
      state.employType = payload;
    },
    setEditProfileMaritalStatus: (state, {payload}) => {
      state.maritalStatus = payload;
    },
    setEditProfileGender: (state, {payload}) => {
      state.gender = payload;
    },
    setEditProfileCountry: (state, {payload}) => {
      state.country = payload;
    },
    setEditProfileCity: (state, {payload}) => {
      state.city = payload;
    },

    setEditDisplayName: (state, {payload}) => {
      state.displayName = payload;
    },
    setEdu1PassYear: (state, {payload}) => {
      console.log(payload, "from set passing year redux");
      state.passingYear1 = payload;
    },
    setEdu2PassYear: (state, {payload}) => {
      state.passingYear2 = payload;
    },
    setEduTpe1: (state, {payload}) => {
      state.education1 = payload;
    },
    setEduTpe2: (state, {payload}) => {
      state.education2 = payload;
    },
    setEditProfile: (state, {payload}) => {
      state.age_from = payload.age_from ?? "";
      state.age_to = payload.age_to ?? "";
      state.displayName = payload.display_name ?? "";
      state.city = payload.city ?? "";
      state.height_feet = payload.height_feet ?? "";
      state.height_inches = payload.height_inches ?? "";
      state.employType = payload.current_employment_type ?? "";
      state.religion = payload.religion ?? "";
      state.maritalStatus = payload.marital_status ?? "";
      state.height_feet = payload.height_feet ?? "";
      state.height_inches = payload.height_inches ?? "";
      state.weight = payload.weight ?? "";
      state.father_occupation = payload.father_occupation ?? "";
      state.mother_occupation = payload.mother_occupation ?? "";
      state.number_of_brothers = payload.number_of_brothers ?? "";
      state.number_of_sisters = payload.number_of_sisters ?? "";
      // state.country = payload.current_country.map((c) => [...state.country, c]);
    },
  },
});

export const {
  setEdu1PassYear,
  setEdu2PassYear,
  setEduTpe1,
  setEduTpe2,
  setEditProfileEmployType,
  setEditProfileGender,
  setEditProfileHeight,
  setEditProfileMaritalStatus,
  setEditProfileQuestion,
  setEditProfile,
  setEditProfileReligion,
  setEmployType,
  setEditDisplayName,
  updatePreerenceQAns,
  setMaridStatus,
  setEditProfileCity,
  setEditProfileCountry,
} = EditProfileSlice.actions;
export default EditProfileSlice.reducer;
