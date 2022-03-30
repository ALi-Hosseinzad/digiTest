import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { Box, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import styles from '../../../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { login } from '../../redux/reducer/Login/loginReducer';
import { user } from '../../redux/reducer/User/userReducer';

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const User = useSelector((state) => state.user.value);
  const [textInput, setTextInput] = useState({ userName: '', phoneNumber: '' });

  useEffect(() => {
    const getRememberMe = localStorage.getItem('rememberMe');
    if (getRememberMe) {
      setTextInput(JSON.parse(localStorage.getItem('login')));
    }
  }, []);

  const onFinish = (event) => {
    const data = new FormData(event.currentTarget);
    const values = {
      userName: data.get('userName'),
      phoneNumber: data.get('phoneNumber'),
    };
    if (values.userName && values.phoneNumber) {
      setIsLoading(true);
      if (data.get('rememberMe')) {
        localStorage.setItem('rememberMe', true);
        localStorage.setItem('login', JSON.stringify(values));
      }
      cookie.set('login', JSON.stringify(values));
      dispatch(login({ isLoggedIn: true, user: values }));
      const getAllUsers = JSON.parse(localStorage.getItem('allUsers'));
      const result = getAllUsers?.find(({ userName }) => userName === values.userName);

      dispatch(user({ ...values, isOpen: true }));
      result
        ? localStorage.setItem('allUsers', JSON.stringify([{ ...result, isOpen: true }]))
        : localStorage.setItem('allUsers', JSON.stringify([{ ...User, ...values, isOpen: true }]));
      localStorage.setItem('user', JSON.stringify({ ...User, ...values, isOpen: true }));
    } else {
      enqueueSnackbar('Please add your information', {
        variant: 'error',
      });
    }
  };

  return (
    <div className={styles.limiter}>
      <div className={styles.containerLogin}>
        <div className={styles.wrapLogin100}>
          <span className={styles.login100FormTitle}>Login</span>
          <Box component='form' onSubmit={onFinish} noValidate sx={{ mt: 1 }} className={styles.login100Form}>
            <Grid container spacing={4} direction='column' justifyContent='center' alignItems='center'>
              <Grid item>
                <Typography className={styles.labelInput100}>Username</Typography>

                <TextField required defaultValue={textInput.userName} name='userName' variant='outlined' placeholder='Username' helperText='Required' />
              </Grid>
              <br />
              <Grid item>
                <Typography className={styles.labelInput100}>Phone number</Typography>
                <TextField name='phoneNumber' required defaultValue={textInput.phoneNumber} type='text' placeholder='Phone Number' helperText='Required' />
              </Grid>
              <Grid item>
                <FormControlLabel name='rememberMe' control={<Checkbox />} label='Remember me!' />
              </Grid>

              <Grid item>
                <div className={styles.containerLogin100FormBtn}>
                  <div className={styles.wrapLogin100FormBtn}>
                    <div className={styles.login100FormBgbtn}></div>
                    <button type='submit' className={styles.login100FormBtn}>
                      Login
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
