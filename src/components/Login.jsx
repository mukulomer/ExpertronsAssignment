import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import emailjs from "emailjs-com";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import authService from "../services/Auth";
import axios from "axios";

// import Users from "./Users";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const [User, setUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/user").then((res) => {
      const persons = res.data;
      console.log(persons);
      setUser(persons);
    });
  }, []);

  if (authService.isLoggedIn()) {
    props.history.push("/");
  }

  const classes = useStyles();

  const [account, SetAccount] = React.useState([
    { username: "", password: "" }
  ]);

  const [errormsg, setErrormsg] = React.useState([
    { username: "", password: "" }
  ]);

  const [open, setOpen] = React.useState(false);

  const handelClick = () => {
    if (isValidate(account.username) && isValidate(account.password)) {
      authService.doLogin(account.username);
      props.history.push("/");
    } else if (!isValidate(account.username) && account.username !== "") {
      props.history.push("/signup");
    } else {
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validateuser = (property, value) => {
    let errormsgCopy = { ...errormsg };

    if (property === "username") {
      if (!checkusername(value)) {
        errormsgCopy.username = "email format is wrong";
      } else {
        errormsgCopy.username = "";
      }
    } else {
      if (!checkpassword(value)) {
        errormsgCopy.password =
          "password must contains atleast one uppercase and one lowercase letter and length must be >=8 ";
      } else {
        errormsgCopy.password = "";
      }
    }

    setErrormsg(errormsgCopy);
  };

  const checkusername = (name) => {
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (name.match(mailformat)) {
      return true;
    }
    return false;
  };

  const checkpassword = (password) => {
    let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (password.match(pattern)) {
      return true;
    }

    return false;
  };

  const isValidate = (param) => {
    if (param === account.username) {
      return User.find((user) => user.user === param);
    } else {
      return User.find((user) => user.password === param);
    }
  };

  const handelchange = (property, event) => {
    let accountcopy = { ...account };
    accountcopy[property] = event.target.value;

    SetAccount(accountcopy);

    validateuser(property, event.target.value);
  };

  const handleforget = () => {
    console.log("working fine");
    sendFeedback("template_yedouth", {
      to_name: account.username,
      message: "Reset your password your new password is : 8668@Aabn ",
      reply_to: "mukulomer123456@gmail.com"
    });
  };

  function sendFeedback(templateId, variables) {
    emailjs
      .send("resetid", templateId, variables, "user_gEBGvMjMHZna3m9yT5lGO")
      .then((res) => {
        console.log("Email successfully sent!");
      })
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            error={errormsg.username}
            helperText={errormsg.username}
            autoComplete="email"
            autoFocus
            value={account.username}
            onChange={() => {
              handelchange("username", event);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={errormsg.password}
            helperText={errormsg.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={account.password}
            onChange={() => {
              handelchange("password", event);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handelClick}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" onClick={handleforget} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                Incorrect username or password
              </Alert>
            </Snackbar>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
