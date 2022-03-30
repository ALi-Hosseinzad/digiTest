import React from "react";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { withStyles } from "@mui/styles";

export default function SwitchComponent({ checked, handleChange, enterTime }) {
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

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={enterTime ? "Exit" : "Enter"}
      />
    </FormGroup>
  );
}
