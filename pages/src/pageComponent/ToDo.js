import React, { Component, Fragment } from 'react';
import AddTodoForm from '../components/AddTodoForm';
import List from '../components/List';
import { Grid, Paper } from '@mui/material';

const styles = {
  Paper: {
    padding: 20,
    margin: 'auto',
    textAlign: 'center',
    width: 500,
  },
};

class ToDo extends Component {
  state = {
    list: {},
  };
  addToList = (todo) => {
    let list = { ...this.state.list };
    list[`todo${Date.now()}`] = {
      todo: todo,
      status: 'active',
    };

    this.setState({ list });
  };
  deleteTodo = (key) => {
    let list = { ...this.state.list };
    list[key] = null;

    this.setState({ list });
  };
  updateTodo = (key) => {
    let list = { ...this.state.list };
    list[key]['status'] = 'editing';

    this.setState({ list });
  };
  saveTodo = (key, todo) => {
    let list = { ...this.state.list };
    list[key] = {
      todo: todo,
      status: 'active',
    };

    this.setState({ list });
  };
  render() {
    return (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper style={styles.Paper}>
              <AddTodoForm addToList={this.addToList} />
            </Paper>
          </Grid>
          <Grid item xs={12} style={styles.Paper}>
            <List deleteTodo={this.deleteTodo} list={this.state.list} updateTodo={this.updateTodo} saveTodo={this.saveTodo} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default ToDo;
