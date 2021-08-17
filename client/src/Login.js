import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { SnackbarError } from "./components";
import { LinkButtonContainer, SidebarImage } from "./components/Login";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    fontFamily: theme.typography.fontFamily,
  },
  formBtn: {
    padding: "17px 30px",
    marginRight: "40px",
    boxShadow : "0 6px 10px rgba(0,0,0,0.09), 0 2px 3px rgba(0,0,0,0.13)",    
    color: theme.palette.primary.main
  },
  loginBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  loginBtn: {
    fontFamily: 'Helvetica, Arial',
    padding: "17px 55px",
    color: "white",
    backgroundColor: theme.palette.primary.main
  },
  formControlContainer: {
    display: "flex",
    width: "70%",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: "15%",
    margin: "auto"
  },
  formTitle: {
    fontWeight: "600"
  },
  formControlChildren: {
    width: "100%"
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username && password) {
      await login({ username, password });
    } else {
      setErrorMessage("Enter username & password");
      setSnackBarOpen(true);
    }
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Grid container className={classes.container}>
        <SidebarImage/>
        <Grid item xs={12} sm={7} md={7} elevation={6}>
          <LinkButtonContainer>
            <Typography color="textSecondary">Don't have an account?</Typography>
            <Box component='span' m={1} />
            <Button
              component={Paper}
              className={classes.formBtn}
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </LinkButtonContainer>
          <Box component='span' m={1} />
          <Box className={classes.formControlContainer}>
            <form onSubmit={handleLogin}>
              <Grid>
                <Grid item>
                  <Typography component='h5' variant='h5' className={classes.formTitle}>Welcome back!</Typography>
                </Grid>
                <Grid item>
                  <FormControl
                    margin='normal'
                    className={classes.formControlChildren}
                    required
                  >
                    <TextField
                      aria-label='username'
                      label='E-mail address'
                      name='username'
                      type='text'
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl
                    margin='normal'
                    className={classes.formControlChildren}
                    required
                  >
                    <TextField
                      label='Password'
                      aria-label='Password'
                      type='password'
                      name='password'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box component='span' m={1} />
              <Grid item className={classes.loginBtnContainer}>
                <Button
                  type='submit'
                  className={classes.loginBtn}
                  variant='contained'
                  size='large'
                >
                  Login
                </Button>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
