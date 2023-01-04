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
    setEditProfileQuestion: (state, {payload}) => {
      state.dynamicQuestion = payload;
    },
    setEditProfileHeight: (state, {payload}) => {
      state.age_from = payload.age_from;
      state.age_to = payload.age_to;
      state.height_feet = payload.height_feet;
      state.height_inches = payload.height_inches;
    },
    setPreviousEditProfile: (state, {payload}) => {
      state.age_from = payload.age_from ?? "";
      state.age_to = payload.age_to ?? "";
      state.displayName = payload.display_name ?? "";
      state.city = payload.city ?? "";
      state.height_feet = payload.height_feet ?? "";
      state.height_inches = payload.height_inches ?? "";
      state.employType = payload.current_employment_type ?? "";
      state.religion = payload.religion ?? "";
      state.maritalStatus = payload.marital_status ?? "";
      // state.country = payload.current_country.map((c) => [...state.country, c]);
    },
  },
});

export const {
  setEditProfileEmployType,
  setEditProfileGender,
  setEditProfileHeight,
  setEditProfileMaritalStatus,
  setEditProfileQuestion,
  setPreviousEditProfile,
  setEditProfileReligion,
  setEmployType,
  updatePreerenceQAns,
  setMaridStatus,
  setEditProfileCity,
  setEditProfileCountry,
} = EditProfileSlice.actions;
export default EditProfileSlice.reducer;
