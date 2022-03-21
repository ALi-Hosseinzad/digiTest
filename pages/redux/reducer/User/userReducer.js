import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  title: "",
  userName: "",
  phoneNumber: "",
  id: "",
  list: [],
  checked: false,
  enterTime: false,
  exitTime: false,
  userEnterTimes: [],
  isOpen: false,
  showDeleteBtn: false,
  workType: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: { ...initialStateValue } },
  reducers: {
    user: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    removeUser: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { user, removeUser } = userSlice.actions;

export default userSlice.reducer;
