import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/Login/loginReducer";
import userReducer from "../reducer/User/userReducer";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});

export default store;
