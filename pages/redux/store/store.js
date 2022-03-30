import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/Login/loginReducer";
import userReducer from "../reducer/User/userReducer";
import allUsersReducer from "../reducer/AllUser/allUsersReducer"

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    login: loginReducer,
    user: userReducer,
    allUsers:allUsersReducer
  },
});

export default store;
