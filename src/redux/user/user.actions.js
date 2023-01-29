import axios from 'axios';
import api from '../../api/api'

export const loginSuccessAction = (data) => {
  return {
    type: 'loginSuccess',
    payload: { ...data },
  };
};

export const registerSuccessAction = (data) => {
  return {
    type: 'registerSuccess',
    payload: { ...data },
  };
};

export const registerFail = (message) => {
  return {
    type: 'registerFail',
    payload: message,
  };
};

export const loginFail = (message) => {
  return {
    type: 'loginFail',
    payload: message,
  };
};

export const loginAction = (email, password, dispatch) => {
  return async () => {
    try {
      const res = await axios.post('http://localhost:3000/v1/auth/login', {
        email,
        password,
      });
      console.log('server result: ', res);

      if (!res.data) {
        dispatch(loginFail(res.data.message)); // login fail action
        return;
      }

      // localStorage.setItem("token", JSON.stringify(res.data.token));

      dispatch(loginSuccessAction(res.data));
    } catch (err) {
      console.log('Error logging in user: ', err);
      dispatch(loginFail(err.message));
    }
  };
};

export const registerAction = (name, email, password, dispatch) => {
  return async () => {
    try {
      console.log('sent request to server');
      const res = await axios.post('http://localhost:3000/v1/auth/register', {
        name,
        email,
        password,
      });
      console.log('server result: ', res);

      if (res.data.err) {
        dispatch(registerFail(res.data.err.message));
        return;
      }

      if (!res.data.auth) {
        dispatch(registerFail(res.data.message));
      }

      dispatch(registerSuccessAction(res.data));
    } catch (err) {
      console.log('Error registering user: ', err);
      dispatch(registerFail(err.message));
    }
  };
};

export const logOutSuccess = () => {
  return {
    type: 'logOutSuccess',
  };
};

export const logOutAction = (dispatch) => {
  return async () => {
    api.post('http://localhost:3000/v1/auth/logout', {
      refreshToken: localStorage.getItem('refreshToken')
    });

    dispatch(logOutSuccess());
  };
};

export const fetchUsersSuccessAction = (data) => {
  return {
    type: 'fetchUsersSuccess',
    payload: {
      users: data
    }
  }
}

export const fetchUsersAction = (dispatch) => {
  return async () => {
    try {
      const res = await api.get('user/get-all-users')
      
      dispatch(fetchUsersSuccessAction(res.users))
    } catch(err) {
      console.log('ERROR!!! fetching users.')
    }
  }
}

export const blockUserAction = (userId, dispatch) => {
  return async () => {
    try {
      const res = await api.post('user/block-user', {userId})
      console.log('Response from blocking user:', res)
      dispatch(fetchUsersAction(dispatch))

    } catch(err) {
      console.log('ERROR!!! blocking users.')
    }
  }
}

export const unblockUserAction = (userId, dispatch) => {
  return async () => {
    try {
      const res = await api.post('user/unblock-user', {userId})
      console.log('Response from unblocking user:', res)
      dispatch(fetchUsersAction(dispatch))

    } catch(err) {
      console.log('ERROR!!! unblocking users.')
    }
  }
}
