import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  religion: "",
  employType: "",
  displayName: "",
  marital_status: "",
  date_of_birth: "",
  phone_number: "",
  full_name: "",
  country: "",
  city: "",
  gender: "",
  height_feet: "",
  height_inches: "",
  weight: "",
  father_occupation: "",
  mother_occupation: "",
  number_of_brothers: "",
  number_of_sisters: "",
  passingYear3: "",
  passingYear4: "",
  passingYear2: "",
  passingYear1: "",

  education3: "",
  education2: "",
  education1: "",
  education4: "",
  education4_major: "",
  education4_institution: "",
  education2_major: "",
  education2_institution: "",
  education3_major: "",
  education3_institution: "",
  education1_major: "",
  education1_institution: "",
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
    // setEditProfileMaritalStatus: (state, {payload}) => {
    //   state.maritalStatus = payload;
    // },
    setEditProfileGender: (state, {payload}) => {
      state.gender = payload;
    },
    setEditProfileCountry: (state, {payload}) => {
      state.country = payload;
    },
    setEditProfileCity: (state, {payload}) => {
      state.city = payload;
    },
    setEditMaritalStatus: (state, {payload}) => {
      state.marital_status = payload;
    },
    setEditReligion: (state, {payload}) => {
      state.religion = payload;
    },
    setEditDisplayName: (state, {payload}) => {
      state.displayName = payload;
    },
    setEdu1PassYear: (state, {payload}) => {
      //console.log(payload, "from set passing year redux");
      state.passingYear1 = payload;
    },
    setEdu3PassYear: (state, {payload}) => {
      //console.log(payload, "from set passing year redux");
      state.passingYear3 = payload;
    },
    setEdu4PassYear: (state, {payload}) => {
      //console.log(payload, "from set passing year redux");
      state.passingYear4 = payload;
    },
    setEdu2PassYear: (state, {payload}) => {
      state.passingYear2 = payload;
    },
    setEdu1PassYear: (state, {payload}) => {
      state.passingYear1 = payload;
    },
    setEduTpe1: (state, {payload}) => {
      state.education1 = payload;
    },
    setEduTpe2: (state, {payload}) => {
      state.education2 = payload;
    },
    setEduTpe3: (state, {payload}) => {
      state.education3 = payload;
    },
    setEduTpe4: (state, {payload}) => {
      state.education4 = payload;
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
      state.date_of_birth = payload.date_of_birth ?? "";
      state.full_name = payload?.full_name ?? "";
      state.phone_number = payload?.phone_number ?? "";
      state.education1_institution = payload.education1_institution ?? "";
      state.education1_major = payload.education1_major ?? "";
      state.education2_institution = payload.education2_institution ?? "";
      state.education2_major = payload.education2_major ?? "";
      state.education3_institution = payload.education3_institution ?? "";
      state.education3_major = payload.education3_major ?? "";
      state.education4_institution = payload.education4_institution ?? "";
      state.education4_major = payload.education_major ?? "";
      // state.country = payload.current_country.map((c) => [...state.country, c]);
    },
  },
});

export const {
  setEditMaritalStatus,
  setEditReligion,
  setEdu1PassYear,
  setEdu4PassYear,

  setEdu2PassYear,
  setEdu3PassYear,
  setEduTpe3,
  setEduTpe4,
  setEduTpe1,
  setEduTpe2,

  setEditProfileEmployType,
  setEditProfileGender,
  setEditProfileHeight,
  // setEditProfileMaritalStatus,
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
