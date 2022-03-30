import React, { Component } from "react";
import { Save } from "@mui/icons-material";
import { Grid, IconButton, Input, Paper } from "@mui/material";

const styles = {
  Icon: {
    marginLeft: "auto",
    width: "10%"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    width: 500
  }
};

class EditTodo extends Component {
  inputRef = React.createRef();
  render() {
    return (
      <Grid xs={12} item key={this.props.index}>
        <Paper elevation={2} style={styles.Paper}>
          <form
            onSubmit={() => {
              this.props.saveTodo(
                this.props.index,
                this.inputRef.current.value
              );
            }}
            style={{ display: "flex" }}
          >
            <Input
              style={{ width: "90%" }}
              defaultValue={this.props.todo}
              inputRef={this.inputRef}
            />
            <IconButton
              type="submit"
              color="primary"
              aria-label="Add"
              style={styles.Icon}
            >
              <Save fontSize="small" />
            </IconButton>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default EditTodo;
