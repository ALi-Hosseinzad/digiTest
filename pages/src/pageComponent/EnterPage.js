import React, { useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/reducer/User/userReducer";
import { useSnackbar } from "notistack";

export default function EnterPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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

  const handleChange = (event) => {
    const aMinuteLess =
      User.enterTime && new Date(User.enterTime.getTime() - 1000 * 60);
    if (!User.enterTime) {
      dispatch(
        user({
          checked: event.target.checked,
          enterTime: new Date(),
          userEnterTimes: [
            {
              id: User.enterTimes?.length + 1,
              enterTime: new Date(),
              exitTime: false,
            },
          ],
        })
      );
    } else if (User.enterTime && aMinuteLess) {
      enqueueSnackbar("You can't exit the company less than 10 min", {
        variant: "error",
      });
    } else {
      dispatch(
        user({
          checked: event.target.checked,
          enterTime: false,
          exitTime: new Date(),
          userEnterTimes: [
            ...User.userEnterTimes,
            {
              ...User.userEnterTimes[User.enterTimes?.length - 1],
              id: User.enterTimes?.length - 1,
              exitTime: new Date(),
            },
          ],
        })
      );
    }
  };

  return (
    <Grid container>
      <Grid item>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={User?.checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={User.time ? "Enter" : "Exit"}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
s;
