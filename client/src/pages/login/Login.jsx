import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const navigate = useNavigate();
  const loginForRegister = () => {
    navigate("/register");
  };

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="logintTop"></div>
          <div className="loginLeft">
            <h3 className="loginLogo">Fakebook</h3>
            <span className="loginDesc">
              Fakebook，讓你和親朋好友來看看我做的網站，隨時有機會就請面試我。
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleSubmit}>
              <input
                placeholder="電子郵件地址"
                type={"email"}
                className="loginInput"
                required
                maxLength="50"
                ref={email}
              />
              <input
                placeholder="密碼"
                type={"password"}
                className="loginInput"
                required
                minLength="6"
                ref={password}
              />
              <button
                className="loginButton"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "登入"
                )}
              </button>
              <span className="loginForgot">忘記密碼</span>
              <hr className="loginHr" />
              <button className="loginForRegister" onClick={loginForRegister}>
                建立新帳號
              </button>
            </form>
            <span className="warning">
              請勿輸入真實帳密，若你輸入，代表我做的太成功了
            </span>
          </div>
        </div>
      </div>

      <div className="loginFooter">
        <span className="footerIntro">
          請參考我的
          <span>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://marczhu.netlify.app/"
            >
              個人網站
            </a>
          </span>
          ,
          <span>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/aws753951/facebook"
            >
              Github
            </a>
          </span>
        </span>
      </div>
    </>
  );
}
