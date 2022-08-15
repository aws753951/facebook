import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const loginForRegister = () => {
    navigate("/register");
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
            <div className="loginBox">
              <input placeholder="電子郵件地址" className="loginInput" />
              <input placeholder="密碼" className="loginInput" />
              <button className="loginButton">登入</button>
              <span className="loginForgot">忘記密碼</span>
              <hr className="loginHr" />
              <button className="loginForRegister" onClick={loginForRegister}>
                建立新帳號
              </button>
            </div>
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
            <a rel="noreferrer" href="https://marczhu.netlify.app/">
              個人網站
            </a>
          </span>
          ,
          <span>
            <a rel="noreferrer" href="https://github.com/aws753951/facebook">
              Github
            </a>
          </span>
        </span>
      </div>
    </>
  );
}
