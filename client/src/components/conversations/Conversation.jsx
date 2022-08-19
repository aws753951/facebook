export default function Conversation() {
  return (
    <div className="conversation">
      <img
        src={require("../../assets/person/8.jpeg")}
        alt=""
        className="conversationImg"
      />
      <div className="conversationContainer">
        <span className="conversationName">妹子</span>
        <span className="coversationText">安安幾歲住哪</span>
      </div>
    </div>
  );
}
