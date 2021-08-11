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
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    fontFamily: theme.typography.fontFamily
  },
  formContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2vh 5vw 0 0"
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
  backgroundContainer: {
    backgroundImage: `linear-gradient(to bottom, rgba(58,141,255,0.85),rgb(134,185,255,0.85)),url(./assets/img/bg-img.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundText: {
    flexDirection: "column",
    color: "white",
    textAlign: "center"
  }
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
        <Grid item sm={4} md={4} className={classes.backgroundContainer}>
          <Box display={{ xs: "none", sm: "block", md: "block" }}>
            <img src="./assets/img/bubble.svg" alt='converse anywhere' />
          </Box>
          <Box
            component='span'
            display={{ xs: "none", sm: "block", md: "block" }}
            m={1}
          />
          <Box
            component='grid'
            display={{ xs: "none", sm: "flex", md: "flex" }}
            className={classes.backgroundText}
          >
            <Typography component='h4' variant='h4'>
              Converse with anyone
            </Typography>
            <Typography component='h4' variant='h4'>
              with any language
            </Typography>
          </Box>
        </Grid>        
        <Grid item xs={12} sm={8} md={7} elevation={6} square>
          <Grid item className={classes.formContainer}>
            <Typography>Don't have an account?</Typography>
            <Box component='span' m={1} />
            <Button
              component={Paper}
              className={classes.formBtn}
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </Grid>
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
