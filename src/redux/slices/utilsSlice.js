import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isEmptyQuestion: null,
  editData: null,

  isProfileQuesionExist: null,
  isSelfieQuestionExist: null,
  matchModal: false,
  filterErrorMessage: {},
  isFilterModalShow: false,
  isEditNotSave:true
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
    setMatchModal: (state, {payload}) => {
      state.matchModal = payload;
    },
    setFilterModalShow: (state, {payload}) => {
      state.isFilterModalShow = payload;
    },
    setFilterErrorMessage: (state, {payload}) => {
      state.filterErrorMessage = payload;
    },
    setEditData: (state, {payload}) => {
      state.editData = payload;
    },
    setIsEditNotSave: (state, {payload}) => {
      state.isEditNotSave = payload;
    },
     

  },
  
});

export const {
  set_is_image,
  set_is_ques,
  set_is_selfie,
  setMatchModal,
  setFilterErrorMessage,
  setFilterModalShow,
  setEditData,setIsEditNotSave
} = utilsSlice.actions;
export default utilsSlice.reducer;
