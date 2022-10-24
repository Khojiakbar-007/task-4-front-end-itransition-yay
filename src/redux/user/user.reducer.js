const INITIAL_STATE = {
  isSignedIn: false,
  userDetails: null,
  registeredEmails: [],
  currentMessage: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "loginSuccess":
      return {
        ...state,
        isSignedIn: true,
        userDetails: {
          email: action.payload.email,
        },
        currentMessage: "Successfully logged in",
      };

    case "registerSuccess":
      return {
        ...state,
        currentMessage: action.payload.message,
        registeredEmails: [...state.registeredEmails, action.payload.email],
      };

    case 'loginFail':
    case 'registerFail':
      return {
        ...state,
        currentMessage: action.payload
      }

    case "logOutSuccess":
      return {
        ...state,
        isSignedIn: false,
        userDetails: null,
        currentMessage: "Successfully logged out",
      };
    default:
      return state;
  }
};

export default userReducer;
