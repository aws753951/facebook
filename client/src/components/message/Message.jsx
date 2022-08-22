import moment from "moment";

export default function Message({ message, own }) {
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
          <p className="messageTime">
            {message && moment(message.createdAt).format("YYYY-MM-DD-HH:mm:ss")}
          </p>
          <p className="messageText">{message && message.text}</p>
        </div>
      </div>
    </div>
  );
}
