export default function Message({ own }) {
  return (
    // change class and set condition of css => .message.own  // .message
    <div className={own ? "message own" : "message"}>
      <div className="messageWrapper">
        <img
          src={require("../../assets/person/8.jpeg")}
          alt=""
          className="messageImg"
        />

        <div className="messageContainer">
          <p className="messageTime">2022年8月13日 15:24</p>
          <p className="messageText">哈囉你好嗎?</p>
        </div>
      </div>
    </div>
  );
}
