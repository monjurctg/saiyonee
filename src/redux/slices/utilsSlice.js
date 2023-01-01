import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isEmptyQuestion: null,
  isProfileQuesionExist: null,
  isSelfieQuestionExist: null,
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    set_is_image: (state, {payload}) => {
      state.isProfileQuesionExist = payload;
    },
    set_is_selfie: (state, {payload}) => {
      state.isSelfieQuestionExist = payload;
    },
    set_is_ques: (state, {payload}) => {
      state.isEmptyQuestion = payload;
    },
  },
});

export const {set_is_image, set_is_ques, set_is_selfie} = utilsSlice.actions;
export default utilsSlice.reducer;
