const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "ADDFRIENDS":
      return {
        ...state,
        user: {
          ...state.user,
          addfriends: [...state.user.addfriends, action.payload],
        },
      };
    case "UNFRIENDS":
      return {
        ...state,
        user: {
          ...state.user,
          addfriends: state.user.addfriends.filter((f) => f !== action.payload),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
