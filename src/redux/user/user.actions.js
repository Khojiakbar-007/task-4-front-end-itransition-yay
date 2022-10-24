import axios from "axios";

export const loginSuccessAction = (email) => {
  return {
    type: "loginSuccess",
    payload: {
      email,
    },
  };
};

export const registerSuccessAction = (email, message) => {
  return {
    type: "registerSuccess",
    payload: {
      email,
      message,
    },
  };
};

export const registerFail = (message) => {
  return {
    type: 'registerFail',
    payload: message
  }
}

export const loginFail = (message) => {
  return {
    type: 'loginFail',
    payload: message
  }
};

export const loginAction = (email, password, dispatch) => {
  return async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log("server result: ", res);

      if (!res.data.auth) {
        dispatch(loginFail(res.data.message)); // login fail action
        return;
      }

      localStorage.setItem("token", JSON.stringify(res.data.token));
      dispatch(loginSuccessAction(email));
    } catch (err) {
      console.log("Error logging in user: ", err);
    }
  };
};

export const registerAction = (name, email, password, dispatch) => {
  return async () => {
    try {
      console.log("sent request to server");
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      console.log("server result: ", res);

      if (res.data.err) {
        dispatch(registerFail(res.data.err.message));
        return;
      }

      if (!res.data.auth) {
        dispatch(registerFail(res.data.message))
      }

      dispatch(
        registerSuccessAction(
          email,
          res.data.message || "Successfully registered, login now"
        )
      );
    } catch (err) {
      console.log("Error registering user: ", err);
      dispatch(registerFail(err.message))
    }
  };
};

export const logOutSuccess = () => {
  return {
    type: "logOutSuccess",
  };
};

export const logOutAction = (dispatch) => {
  return async () => {

    axios.get("http://localhost:5000/auth/logout");

    dispatch(logOutSuccess());
  };
};
