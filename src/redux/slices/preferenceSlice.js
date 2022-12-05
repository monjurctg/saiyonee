import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  dynamicQuestion: [],
  religion: "Select religion",
  employType: "Select employment type",
  maritalStatus: "Select marital status",
  country: ["bangladesh", "india"],
  gender: "male",
  age_form: 14,
  age_to: 34,
  height_feet: 5,
  height_inches: 4,

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
    setPreferenceCountry: (state, {payload}) => {
      state.country = payload;
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
  setPreferenceReligion,
  setEmployType,
  updatePreerenceQAns,
  setMaridStatus,
  setPreferenceCity,
  setPreferenceCountry,
  setpreferenceQuestion,
  setpreferenceAns,
} = preferenceSlice.actions;
export default preferenceSlice.reducer;
