import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { SnackbarError } from "./components";
import { LinkButtonContainer, SidebarImage } from "./components/Login";
import Paper from "@material-ui/core/Paper";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    fontFamily: theme.typography.fontFamily
  },
  formBtn: {
    textAlign:"center",
    marginRight: "30px",
    padding: "17px 35px",
    boxShadow : "0 6px 10px rgba(0,0,0,0.09), 0 2px 3px rgba(0,0,0,0.13)",    
    color: theme.palette.primary.main
  },
  createBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  createBtn: {
    fontFamily: 'Helvetica, Arial',
    padding: "17px 50px",
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
    if (username && email && password) {
      await register({ username, email, password });
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
        <SidebarImage />
        <Grid item xs={12} sm={7} md={7}>
          <LinkButtonContainer>
            <Typography color="textSecondary">Already have an account?</Typography>
            <Box component='span' m={1} />
            <Button
              component={Paper}
              onClick={() => history.push("/login")}
              className={classes.formBtn}
            >
              Login
            </Button>
          </LinkButtonContainer>
          <Box component='span' m={1} />
          <Box className={classes.formControlContainer}>
            <form onSubmit={handleRegister}>
              <Grid>
                <Grid item>
                  <Typography component='h5' variant='h5' className={classes.formTitle}>
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
