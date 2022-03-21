import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { user } from "../../redux/reducer/User/userReducer";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open }) {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user.value);

  const handleClose = (e) => {
    const getAllUsers = JSON.parse(localStorage.getItem("allUsers"));
    const login = JSON.parse(cookie.get("login"));
    const resultData = getAllUsers?.find(
      ({ userName }) => userName === login.userName
    );
    dispatch(user({ isOpen: false, workType: e.target.value }));
    localStorage.setItem("user", JSON.stringify({ ...User }));
    localStorage.setItem("allUsers", JSON.stringify([{ ...resultData,...User }]));
  };
  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Welcome to this page"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Please choose your working type:
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} value="Remote">
          Remote
        </Button>
        <Button onClick={handleClose} value="onSite">
          On Site
        </Button>
      </DialogActions>
    </Dialog>
  );
}
