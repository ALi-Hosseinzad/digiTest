import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {usrs: [],};

export const allUsersSlice = createSlice({
  name: "allUsera",
  initialState: { value: { ...initialStateValue } },
  reducers: {
    allUser: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    removeAllUsers: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { allUsers, removeAllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;
