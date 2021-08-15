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
    fontFamily: theme.typography.fontFamily
  },
  formBtn: {
    color: theme.palette.primary.main
  },
  createBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  createBtn: {
    color: "white",
    backgroundColor: theme.palette.primary.main
  },
  formControlContainer: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: "25%",
    paddingTop: "15%"
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
        <Grid item xs={12} sm={8} md={7} elevation={6} square>
          <LinkButtonContainer>
            <Typography>Don't have an account?</Typography>
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
                  <Typography variant='h4'>Welcome Back!</Typography>
                </Grid>
                <Grid item>
                  <FormControl
                    margin='normal'
                    className={classes.formControlChildren}
                    required
                  >
                    <TextField
                      aria-label='username'
                      label='Username'
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
                      label='password'
                      aria-label='password'
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
                  className={classes.formBtn}
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
