import { Alert, Button } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logOutAction } from "../redux/user/user.actions";

class Home extends Component {
  state = {};
  render() {
    if (!this.props.isSignedIn) return <Redirect to="/" />;
    return (
      <div className="profile-container">
        <Alert severity="info">{this.props.currentMessage}</Alert>
        <h1 className="profile-heading">Yay! You are Logged In!</h1>
        <hr />
        <Button
          sx={{ marginBottom: "1rem", marginTop: "0.5rem" }}
          variant="outlined"
          onClick={this.props.logout}
        >
          Log Out
        </Button>
        <br />
        {/* <Button variant="outlined">Verify</Button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.user.isSignedIn,
  currentMessage: state.user.currentMessage,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logOutAction(dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
