import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Alert, Autocomplete, Snackbar } from "@mui/material";

import { Link as LinkRouter, Redirect } from "react-router-dom";
import { loginAction } from "../redux/user/user.actions";
import { connect } from "react-redux";

const theme = createTheme();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();

    this.state = {
      email: "",
      password: "",
      blurredFields: [], // fields that lost focus
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      alertOpen: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => this.validateIfBlurred(name, value));
  };

  handleBlur = (e) => {
    // set blur state only once
    const { blurredFields } = this.state;
    const isBlurred = blurredFields.includes(e.target.name);

    if (!isBlurred) {
      this.setState({ blurredFields: [...blurredFields, e.target.name] });
      this.validateInput(e.target.name, e.target.value);
    }
  };

  validateInput = (fieldName, value) => {
    // Validation triggers after field blurs
    let errorMessage = "";

    if (fieldName === "email") {
      const validEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (!validEmail) errorMessage = "Please enter correct email";
    }

    if (value === "") errorMessage = "This field is required";

    // Set this input as valid in the state
    this.setState({ [`${fieldName}Valid`]: !errorMessage });

    this.setState({
      formErrors: { ...this.state.formErrors, [fieldName]: errorMessage },
    });
  };

  validateIfBlurred = (fieldName, value) => {
    // extra check for focus for browser autofill cases
    const noFocus =
      this[`${fieldName}Ref`].current.children[1].children[0] !==
      document.activeElement;

    if (this.state.blurredFields.includes(fieldName) || noFocus)
      this.validateInput(fieldName, value);
  };

  handleSubmit = () => {
    if (this.state.emailValid && this.state.passwordValid) {
      console.log("Successfully Logged In");
      this.props.login(this.state.email, this.state.password);
    } else {
      this.setState({ alertOpen: true });
    }
  };

  render() {
    console.log(this.state);
    if (this.props.isSignedIn) return <Redirect to="/home" />;

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {/* prettier-ignore */}
          <Box
            sx={{
              marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>

            <Alert severity="info">{this.props.currentMessage}</Alert>

            <Box sx={{ mt: 1 }}>
              <Autocomplete
                freeSolo
                options={this.props.registeredEmails}
                renderInput={(params) => (
                  <TextField
                    {...params} ref={this.emailRef}
                    margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={this.handleChange} onBlur={this.handleBlur} 
                    error={!!this.state.formErrors.email} helperText={this.state.formErrors.email}
                  />
                )}
              />

              <TextField
                margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" 
                ref={this.passwordRef} onChange={this.handleChange} onBlur={this.handleBlur} 
                error={!!this.state.formErrors.password} helperText={this.state.formErrors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                onClick={this.handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>

              <Link to="/register" variant="body2" component={LinkRouter}>
                {"Don't have an account? Register"}
              </Link>

            </Box>
          </Box>
        </Container>

        <Snackbar
          open={this.state.alertOpen}
          autoHideDuration={4000}
          onClose={() => this.setState({ alertOpen: false })}
        >
          <Alert severity="warning">Please, enter all inputs correctly</Alert>
        </Snackbar>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  registeredEmails: state.user.registeredEmails,
  isSignedIn: state.user.isSignedIn,
  currentMessage: state.user.currentMessage,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(loginAction(email, password, dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
