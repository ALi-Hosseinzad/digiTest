import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/reducer/User/userReducer";
import { useSnackbar } from "notistack";
import SwitchComponent from "../components/Switch";
import ToDo from "./ToDo";
import Holidays from "date-holidays";
import Link from "next/link";

export default function EnterPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const hd = new Holidays();
  const isHoliday = hd.isHoliday(new Date());
  console.log(isHoliday);
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
      User.enterTime && new Date(User.enterTime.getTime() - 10000 * 60);
    if (!User.enterTime && !isHoliday) {
      dispatch(
        user({
          checked: event.target.checked,
          enterTime: new Date(),
          userEnterTimes: [
            {
              id: User.enterTimes?.length||0 + 1,
              enterTime: new Date(),
              exitTime: false,
            },
          ],
        })
      );
    } else if (User.enterTime && aMinuteLess) {
      enqueueSnackbar("You can't exit the company less than 10 min! :(", {
        variant: "error",
      });
    } else if (User.enterTime && !aMinuteLess && !User.Todo) {
      enqueueSnackbar("You can't exit the company without add any tasks! :(", {
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
      <br />
      {!isHoliday ? (
        <Grid item style={User.enterTime?{marginTop:"10%"}:{ marginTop: "25%" }}>
          <Typography>Please set your inter or exit:</Typography>
          <SwitchComponent
            checked={User.checked}
            handleChange={handleChange}
            enterTime={User.enterTime}
          />
        </Grid>
      ) : (
        <Grid item style={{ marginTop: "25%" }}>
          <Typography>
            Today is holiday, You can not enter the office ! :)
          </Typography>
        </Grid>
      )}
      {User.enterTime && (
        <Grid item>
          <ToDo />
            <Link href='/list'>
          <Button variant='contained' color='primary'>
              Go to list page
          </Button>
            </Link>
        </Grid>
      )}
    </Grid>
  );
};
