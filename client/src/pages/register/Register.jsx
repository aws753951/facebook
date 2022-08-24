import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { axiosInstance } from "../../config";

export default function Register() {
  const navigate = useNavigate();
  const registerForLogin = () => {
    navigate("/login");
  };

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== password2.current.value) {
      // set custom warning, but it will be stuck
      password2.current.setCustomValidity("密碼不一致");
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        await axiosInstance.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err.response.data);
        email.current.setCustomValidity("帳號已被註冊過囉");
      }
    }
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
            <form className="loginBox registerBox" onSubmit={handleSubmit}>
              <input
                placeholder="使用者名稱"
                className="loginInput"
                required
                maxLength="20"
                minLength="3"
                ref={username}
              />
              <input
                placeholder="電子郵件地址"
                type={"email"}
                className="loginInput"
                required
                maxLength="50"
                ref={email}
                onChange={(e) => {
                  e.target.setCustomValidity("");
                }}
              />
              <input
                placeholder="密碼"
                type={"password"}
                className="loginInput"
                required
                minLength="6"
                ref={password}
              />
              <input
                placeholder="請再輸入一次密碼"
                type={"password"}
                className="loginInput"
                required
                minLength="6"
                ref={password2}
                onChange={(e) => {
                  e.target.setCustomValidity("");
                }}
              />
              <button type={"submit"} className="loginButton">
                註冊
              </button>
              <hr className="loginHr" />
              <button className="loginForRegister" onClick={registerForLogin}>
                立即登入
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
