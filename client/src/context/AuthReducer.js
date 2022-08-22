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
    case "FOLLOW":
      return {
        // spread prvious state and paste here, state:  like user / isFetching / error
        // cos we are in object, so we could just use spread here.
        ...state,
        user: {
          // state.user:  like username / updatedAt / email...
          ...state.user,
          followings: [
            // spread prvious state, state.user.followings, but use this state to do sth (using dispatch to get sth and push that thing here ).
            ...state.user.followings,
            action.payload,
          ],
        },
      };
    case "UNFOLLOW":
      return {
        // spread prvious state and paste here, state:  like user / isFetching / error
        // cos we are in object, so we could just use spread here.
        ...state,
        user: {
          // state.user:  like username / updatedAt / email...
          ...state.user,
          // use this state to do sth (using dispatch to get sth and filter, only fit condtion could stay ).
          // we are not in object or array, so not using spread, but we can still use state here
          followings: state.user.followings.filter((f) => f !== action.payload),
        },
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
    case "ADDPHOTOS":
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: action.payload,
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
