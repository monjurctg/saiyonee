import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  dynamicQuestion: [],
  religion: "Select religion",
  employType: "Select employment type",
  maritalStatus: "Select marital status",
  country: "",
  city: "",
  ft: null,
  ins: null,
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
    setpreferenceAns: (state, {payload}) => {
      // let id = state?.dynamicQuesAns.find((id) => {
      //   console.log(id, "id");
      // });
      // console.log(state.dynamicQuesAns.includes(payload));
      // if (!id) {

      // }
      state.dynamicQuesAns = [...state.dynamicQuesAns, payload];
    },
  },
});

export const {
  setPreferenceReligion,
  setEmployType,
  setMaridStatus,
  setPreferenceCity,
  setPreferenceCountry,
  setpreferenceQuestion,
  setpreferenceAns,
} = preferenceSlice.actions;
export default preferenceSlice.reducer;
