import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

// 給需要的頁面state的初始設定
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  // 把會更改到的state行為，寫在useReducer內的第一個參數，一般為帶有條件的func，
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    // wrap what component inside application
    <AuthContext.Provider
      // share value with this children
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
