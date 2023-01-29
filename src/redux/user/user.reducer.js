import { saveUserDataAndTokens } from '../../shared/utils';

const INITIAL_STATE = {
  isSignedIn: false,
  userDetails: null,
  currentMessage: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'loginSuccess': {
      return saveUserDataAndTokens(state, action, 'Successfully logged in');
    }

    case 'registerSuccess': {
      return saveUserDataAndTokens(state, action, 'Successfully registered');
    }

    case 'loginFail':
      return {
        ...state,
        currentMessage:
          action.payload || 'Something went wrong, could not log in',
      };

    case 'registerFail':
      return {
        ...state,
        currentMessage:
          action.payload || 'Something went wrong, could not register',
      };

    case 'logOutSuccess':
      return {
        ...state,
        isSignedIn: false,
        userDetails: null,
        currentMessage: 'Successfully logged out',
      };
    
      case 'fetchUsersSuccess':
        return {
          ...state,
          users: action.payload.users || []
        }
    default:
      return state;
  }
};

export default userReducer;
