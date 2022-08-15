import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const registerForLogin = () => {
    navigate("/login");
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
              <input placeholder="使用者名稱" className="loginInput" />
              <input placeholder="電子郵件地址" className="loginInput" />
              <input placeholder="密碼" className="loginInput" />
              <button className="loginButton">註冊</button>
              <hr className="loginHr" />
              <button className="loginForRegister" onClick={registerForLogin}>
                立即登入
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
            <a
              target="_blank"
              rel="noreferrer"
              href="https://marczhu.netlify.app/"
            >
              個人網站
            </a>
          </span>
          ,
          <span>
            <a
              target="_blank"
              rel="noreferrer"
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
