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

import { Link as LinkRouter } from "react-router-dom";
import { registerAction } from "../redux/user/user.actions";
import { connect } from "react-redux";
import { Alert } from "@mui/material";

const theme = createTheme();

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();

    this.state = {
      email: "",
      password: "",
      blurredFields: [], // fields that lost focus
      formErrors: { name: "", email: "", password: "" },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      alertOpen: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("input is changing");
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
      this[`${fieldName}Ref`]?.current.children[1].children[0] !==
      document.activeElement;

    if (this.state.blurredFields.includes(fieldName) || noFocus)
      this.validateInput(fieldName, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.emailValid && this.state.passwordValid) {
      console.log("Successfully Logged In");
      this.props.register(
        this.state.name,
        this.state.email,
        this.state.password
      );
    } else {
      this.setState({ alertOpen: true });
    }
  };

  render() {
    console.log(this.state);
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
              Register
            </Typography>
            <Box
              component="form" sx={{ mt: 1 }} onSubmit={this.handleSubmit}
            >
              <Alert severity="info">{this.props.currentMessage}</Alert>

              <TextField
                margin="normal" required fullWidth id="name" label="Name" name="name" autoFocus 
                onChange={this.handleChange} error={!!this.state.formErrors.name} helperText={this.state.formErrors.name}
                onBlur={this.handleBlur} 
              />
              <TextField
                margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" 
                onChange={this.handleChange} error={!!this.state.formErrors.email} ref={this.emailRef}
                helperText={this.state.formErrors.email} onBlur={this.handleBlur} 
              />
              <TextField
                margin="normal" required fullWidth id="password" label="Password" name="password" autoComplete="password" type="password"
                onChange={this.handleChange} error={!!this.state.formErrors.password} ref={this.passwordRef}
                helperText={this.state.formErrors.password} onBlur={this.handleBlur} 
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />} label="Remember me"
              />
              <Button
                type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>

              <Link to="/" variant="body2" component={LinkRouter}>
                {"Have an account? Login"}
              </Link>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  currentMessage: state.user.currentMessage,
  savedEmails: state.user.registeredEmails,
});

const mapDispatchToProps = (dispatch) => ({
  register: (name, email, password) =>
    dispatch(registerAction(name, email, password, dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
