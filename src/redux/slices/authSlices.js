import {createSlice} from "@reduxjs/toolkit";
import {initialRegState} from "./initialRegState";

const initialState = {
  user: null,
  token: null,
  isAuth: false,
  isRegStart: false,
  isLoading: false,
  education1Other: false,
  education2Other: false,
  education3Other: false,
  education4Other: false,
  currentEmploymentTypeOther: false,
  error: null,
  ...initialRegState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setRegEmail_Pass: (state, {payload}) => {
      state.email = payload.email;
      state.password = payload.password;
      state.password_confirmation = payload.confirmPassword;
    },
    setGender: (state, {payload}) => {
      state.gender = payload.gender;
    },
    setUserType: (state, {payload}) => {
      state.user_type = payload;
    },
    setPersonalInfo: (state, {payload}) => {
      state.full_name = payload.full_name;
      state.date_of_birth = payload.date_of_birth;
      state.height_feet = payload.height_ft;
      state.height_inches = payload.height_inc;
      state.weight = payload.weight;
      state.gender = payload.gender;
    },
    setReligion: (state, {payload}) => {
      state.religion = payload;
    },
    setMaritalStatus: (state, {payload}) => {
      state.marital_status = payload;
    },
    setEducation1: (state, {payload}) => {
      state.education1 = payload;
    },
    setEducation2: (state, {payload}) => {
      state.education2 = payload;
    },
    setEducation3: (state, {payload}) => {
      state.education3 = payload;
    },
    setEducation4: (state, {payload}) => {
      state.education4 = payload;
    },
    setinstitution1: (state, {payload}) => {
      state.education1_institution = payload;
    },
    setinstitution2: (state, {payload}) => {
      state.education2_institution = payload;
    },
    setinstitution3: (state, {payload}) => {
      state.education3_institution = payload;
    },
    setinstitution4: (state, {payload}) => {
      state.education4_institution = payload;
    },
    setVerificationType: (state, {payload}) => {
      state.verification_type = payload;
    },
    setVerificationImg1: (state, {payload}) => {
      state.verification_img1 = payload;
    },
    setVerificationImg2: (state, {payload}) => {
      // console.log('payload', payload)
      state.verification_img2 = payload;
    },

    // major
    setMajor1: (state, {payload}) => {
      state.education1_major = payload;
    },
    setMajor2: (state, {payload}) => {
      state.education2_major = payload;
    },
    setMajor3: (state, {payload}) => {
      state.education3_major = payload;
    },
    setMajor4: (state, {payload}) => {
      state.education4_major = payload;
    },
    // set country
    setCountry: (state, {payload}) => {
      state.current_country = payload;
    },
    setCity: (state, {payload}) => {
      state.current_city = payload;
    },

    // degree
    setDegree1: (state, {payload}) => {
      state.education1Other = payload;
    },
    setDegree2: (state, {payload}) => {
      state.education2Other = payload;
    },
    setDegree3: (state, {payload}) => {
      state.education3Other = payload;
    },
    setDegree4: (state, {payload}) => {
      state.education4Other = payload;
    },

    // passing year
    setPassingYear1: (state, {payload}) => {
      console.log(payload, "year");
      state.education1_passing_year = payload;
    },
    setPassingYear2: (state, {payload}) => {
      state.education2_passing_year = payload;
    },
    setPassingYear3: (state, {payload}) => {
      state.education3_passing_year = payload;
    },
    setPassingYear4: (state, {payload}) => {
      state.education4_passing_year = payload;
    },
    // proffessionl
    setCurrentEmplyType: (state, {payload}) => {
      state.current_employment_type = payload;
    },
    setEmployName: (state, {payload}) => {
      state.employer_name = payload;
    },
    setIndustry: (state, {payload}) => {
      state.industry = payload;
    },
    setDesignation: (state, {payload}) => {
      state.designation = payload;
    },
    setWorkingSince: (state, {payload}) => {
      state.working_since = payload;
    },
    // family info

    setFamilyInformation: (state, {payload}) => {
      state.father_home_district = payload.father_home_district;
      state.father_occupation = payload.father_occupation;
      state.mother_home_district = payload.mother_home_district;
      state.mother_occupation = payload.mother_occupation;
      state.number_of_brothers = payload.number_of_brothers;
      state.number_of_sisters = payload.number_of_sisters;
    },
    // state for toggle
    setEducation1Other: (state, {payload}) => {
      state.education1Other = payload;
    },
    setEducation2Other: (state, {payload}) => {
      state.education2Other = payload;
    },
    setEducation3Other: (state, {payload}) => {
      state.education3Other = payload;
    },
    setEducation4Other: (state, {payload}) => {
      state.education4Other = payload;
    },
    setCurrentEmploymentTypeOther: (state, {payload}) => {},
    setIsRegStart: (state) => {
      state.isRegStart = true;
    },

    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
    regSuccessAction: () => initialState,
  },
});

export const {
  setRegEmail_Pass,
  setGender,
  regSuccessAction,
  setPersonalInfo,
  setMaritalStatus,
  setReligion,
  setUserType,
  setFamilyInformation,
  setEducation1Other,
  setEducation2Other,
  setEducation3Other,
  setEducation4Other,
  setEducation1,
  setEducation2,
  setEducation3,
  setEducation4,
  setDegree1,
  setDegree2,
  setCurrentEmplyType,
  setDegree3,
  setDegree4,
  setDesignation,
  setEmployName,
  setIndustry,
  setMajor1,
  setMajor2,
  setMajor3,
  setMajor4,
  setPassingYear1,
  setPassingYear2,
  setPassingYear3,
  setPassingYear4,
  setWorkingSince,
  setinstitution1,
  setinstitution2,
  setinstitution3,
  setinstitution4,
  setVerificationType,
  setCity,
  setCountry,
  setVerificationImg1,
  setVerificationImg2,
  setIsRegStart,
} = authSlice.actions;
export default authSlice.reducer;
