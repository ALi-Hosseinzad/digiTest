import React from "react";
import { Grid } from "@mui/material";
import Table from "../components/Table";
import Filter from "../components/Filter";

const ListPageComponent = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Filter />
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  );
};

export default ListPageComponent;
