import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SnackbarError } from "./components";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { register } from "./store/utils/thunkCreators";
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


const Signup = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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

        <Grid item xs={12} sm={8} md={8} elevation={6} square>
          <Grid item className={classes.formContainer}>
            <Typography>Already have an account?</Typography>
            <Box component='span' m={1} />
            <Button
              size='large'
              onClick={() => history.push("/login")}
              component={Paper}
              className={classes.formBtn}
            >
              Login
            </Button>
          </Grid>
          <Box component='span' m={1} />
          <Box className={classes.formControlContainer}>
            <form onSubmit={handleRegister}>
              <Grid>
                <Grid item>
                  <Typography component='h4' variant='h4'>
                    Create an account.
                  </Typography>
                </Grid>
                <Box component='span' m={1} />
                <Grid item>
                  <FormControl className={classes.formControlChildren}>
                    <TextField
                      aria-label='username'
                      label='Username'
                      name='username'
                      type='text'
                      required
                    />
                  </FormControl>
                </Grid>
                <Box component='span' m={1} />
                <Grid item>
                  <FormControl className={classes.formControlChildren}>
                    <TextField
                      label='E-mail address'
                      aria-label='e-mail address'
                      type='email'
                      name='email'
                      required
                    />
                  </FormControl>
                </Grid>
                <Box component='span' m={1} />
                <Grid item>
                  <FormControl
                    error={!!formErrorMessage.confirmPassword}
                    className={classes.formControlChildren}
                  >
                    <TextField
                      aria-label='password'
                      label='Password'
                      type='password'
                      inputProps={{ minLength: 6 }}
                      name='password'
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Box component='span' m={1} />
                <Grid item>
                  <FormControl
                    error={!!formErrorMessage.confirmPassword}
                    className={classes.formControlChildren}
                  >
                    <TextField
                      label='Confirm Password'
                      aria-label='confirm password'
                      type='password'
                      inputProps={{ minLength: 6 }}
                      name='confirmPassword'
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Box component='span' m={1} />
                <Grid item className={classes.createBtnContainer}>
                  <Button
                    type='submit'
                    className={classes.createBtn}
                    variant='contained'
                    size='large'
                  >
                    Create
                  </Button>
                </Grid>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
