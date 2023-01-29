const saveTokensToLocalStorage = (tokens) => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

const saveUserDataAndTokens = (state, action, message) => {
  const user = action.payload.user;
  const tokens = action.payload.tokens;

  saveTokensToLocalStorage(tokens);
  return {
    ...state,
    isSignedIn: true,
    userDetails: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    currentMessage: 'Successfully logged in',
  };
};

export { saveTokensToLocalStorage, saveUserDataAndTokens };
