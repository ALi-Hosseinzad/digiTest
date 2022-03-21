import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import cookie from "js-cookie";
import AlertDialogSlide from "../components/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/reducer/User/userReducer";
import EnterPage from "./EnterPage";

export default function Landing() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user.value);

  useEffect(() => {
    const getAllUsers = JSON.parse(localStorage.getItem("allUsers"));
    const login = cookie.get("login") && JSON.parse(cookie.get("login"));
    const resultData = getAllUsers?.find(
      ({ userName }) => userName === login?.userName
    );
    dispatch(
      user({
        record: resultData || User.record,
        isOpen: resultData?.isOpen || User.isOpen,
      })
    );
  }, []);

  return (
    <Container maxWidth="lg" style={{ minHeight: "calc(100vh - 2rem)" }}>
      {User?.isOpen && <AlertDialogSlide open={User?.isOpen} />}
      <EnterPage />
    </Container>
  );
}
