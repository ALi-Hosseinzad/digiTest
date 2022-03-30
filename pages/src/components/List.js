import React from "react";
import { Grid } from "@mui/material";
import Todo from "./Todo";
import EditTodo from "./EditTodo";

class List extends React.Component {
  renderTodo = key => {
    if (this.props.list[key] == null) return null;
    if (this.props.list[key]["status"] === "active") {
      return (
        <Todo
          key={key}
          index={key}
          todo={this.props.list[key]["todo"]}
          deleteTodo={this.props.deleteTodo}
          updateTodo={this.props.updateTodo}
        />
      );
    } else if (this.props.list[key]["status"] === "editing") {
      return (
        <EditTodo
          key={key}
          index={key}
          todo={this.props.list[key]["todo"]}
          saveTodo={this.props.saveTodo}
        />
      );
    }
  };
  render() {
    return (
      <Grid container>
        {Object.keys(this.props.list).map(key => this.renderTodo(key))}
      </Grid>
    );
  }
}

export default List;
