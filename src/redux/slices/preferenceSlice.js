import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  religion: "Select religion",
  employType: "Select employment type",
  maritalStatus: "Select marital status",
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
  },
});

export const {setPreferenceReligion, setEmployType, setMaridStatus} =
  preferenceSlice.actions;
export default preferenceSlice.reducer;
