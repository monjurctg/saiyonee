import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  dynamicQuestion: [],
  religion: "",
  employType: "",
  maritalStatus: "",
  country: ["bangladesh"],
  gender: "male",
  age_form: "",
  age_to: "",
  height_feet: "",
  height_inches: "",

  dynamicQuesAns: [],
};

const preferenceSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setPreferenceReligion: (state, {payload}) => {
      state.religion = payload;
    },
    setEmployType: (state, {payload}) => {
      state.employType = payload;
    },
    setMaridStatus: (state, {payload}) => {
      state.maritalStatus = payload;
    },
    setGender: (state, {payload}) => {
      state.gender = payload;
    },
    setPreferenceCountry: (state, {payload}) => {
      state.country = [...state.country, payload];
    },
    setPreferenceCity: (state, {payload}) => {
      state.city = payload;
    },
    setpreferenceQuestion: (state, {payload}) => {
      state.dynamicQuestion = payload;
    },
    setHeight: (state, {payload}) => {
      state.age_form = payload.age_form;
      state.age_to = payload.age_to;
      state.height_feet = payload.height_feet;
      state.height_inches = payload.height_inches;
    },
    setPreviousPreference: (state, {payload}) => {
      state.age_form = payload.age_form;
      state.age_to = payload.age_to;
      state.height_feet = payload.height_feet;
      state.height_inches = payload.height_inches;
      state.employType = payload.current_employment_type;
      state.religion = payload.religion;
      state.maritalStatus = payload.marital_status;
      // state.country = payload.current_country.map((c) => [...state.country, c]);
    },

    setpreferenceAns: (state, {payload}) => {
      state.dynamicQuesAns = [...state.dynamicQuesAns, payload];
    },
    updatePreerenceQAns: (state, {payload}) => {
      state.dynamicQuesAns = payload;
    },
  },
});

export const {
  setGender,
  setPreviousPreference,
  setPreferenceReligion,
  setEmployType,
  updatePreerenceQAns,
  setMaridStatus,
  setPreferenceCity,
  setPreferenceCountry,
  setpreferenceQuestion,
  setpreferenceAns,
  setHeight,
} = preferenceSlice.actions;
export default preferenceSlice.reducer;
