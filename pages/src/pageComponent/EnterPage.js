import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/reducer/User/userReducer";
import { useSnackbar } from "notistack";
import { withStyles } from "@mui/styles";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 180,
    height: 52,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(130px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 47,
    height: 50,
  },
  track: {
    borderRadius: 48 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
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
              id: Number(User.enterTimes?.length) - 1,
              exitTime: new Date(),
            },
          ],
        })
      );
    }
  };
  console.log(User);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography>Please set your inter or exit:</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <IOSSwitch
                checked={User?.checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={User.enterTime ? "Exit" : "Enter"}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
