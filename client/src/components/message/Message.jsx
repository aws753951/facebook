import moment from "moment";

export default function Message({ message, own, pic }) {
  return (
    // change class and set condition of css => .message.own  // .message
    <div className={own ? "message own" : "message"}>
      <div className="messageWrapper">
        <img
          src={pic ? pic : require("../../images/noAvatar.png")}
          alt=""
          className="messageImg"
        />

        <div className="messageContainer">
          <p className="messageTime">
            {message && moment(message.createdAt).format("YYYY-MM-DD-HH:mm:ss")}
          </p>
          <p className="messageText">{message && message.text}</p>
        </div>
      </div>
    </div>
  );
}
