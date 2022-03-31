import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import queryString from "query-string";
import { useSnackbar } from "notistack";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  TextField,
  Button,
  Radio,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const defaultValues = {
  name: "",
  workType: "",
  showDeleteBtn: false,
};
const Filter = () => {
  const router = useRouter();
  console.log(router)
  const [queryParam] = useState(router.query);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(defaultValues);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (
      queryParam.name ||
      queryParam.workType ||
      queryParam.showDeleteBtn
    ) {
      setFormValues(queryParam);
    } else {
      setFormValues(defaultValues);
    }
  }, [queryParam]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  const handleSubmit = (event) => {
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const values = {
      name: data.get("name"),
      workType: data.get("workType"),
    };
    if (values) {
      router.push({query: { ...formValues, pageNumber: 1 }});
      setFormValues({ showDeleteBtn: true });
      setIsLoading(false);
    } else {
      enqueueSnackbar("Please inter a value for form!", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    router.push({ query: {} });
    setFormValues(defaultValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl>
            <FormLabel>Work Type</FormLabel>
            <RadioGroup
              name="workType"
              value={formValues.workingType}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="remote"
                value="remote"
                control={<Radio size="small" />}
                label="Remote"
              />
              <FormControlLabel
                key="onSite"
                value="onSite"
                control={<Radio size="small" />}
                label="OnSite"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button variant="contained" color="primary" type="submit"  loading={isLoading}>
          Search
        </Button>
        {formValues.showDeleteBtn && (
          <Button variant="contained" color="error" onClick={resetSearch} startIcon={<DeleteIcon />}>
            Clean
          </Button>
        )}
      </Grid>
    </form>
  );
};

export default Filter;
