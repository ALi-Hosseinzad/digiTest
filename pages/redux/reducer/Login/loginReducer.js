import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

const getToken = cookie.get("login");

const initialStateValue = {
  userName: "",
  token: getToken,
  isLoggedIn: !!getToken,
  prevPath: "",
  expireIn: "",
};
export const loginSlice = createSlice({
  name: "login",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    logout: (state, action) => {
      cookie.remove("login");
      localStorage.clear();
      state.value = initialStateValue;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
