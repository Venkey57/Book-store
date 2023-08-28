import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
  selectedTask: {},
  error: "",
  activeCategory: "",
  data: [],
  page: 0,
  rowsPerPage: 7,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
    setDataList: (state, action) => {
      state.data = action.payload;
    },
    setpageChange: (state, action) => {
      state.page = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const {
  setSelectedTask,
  setTaskList,
  setActiveCategory,
  setDataList,
  setpageChange,
} = userSlice.actions;

export default userSlice.reducer;
