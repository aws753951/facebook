// use to make req
export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  //   go to reducer
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  //   no need but common use
  payload: error,
});

export const Follow = (userID) => ({
  type: "FOLLOW",
  payload: userID,
});

export const unFollow = (userID) => ({
  type: "UNFOLLOW",
  payload: userID,
});
