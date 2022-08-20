import { useEffect, useState } from "react";
import axios from "axios";

export default function Conversation({ conversation, user }) {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendID = conversation.members.find((c) => c !== user._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/?userID=${friendID}`);
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation, user]);

  return (
    <div className="conversation">
      <img
        src={require("../../assets/person/8.jpeg")}
        alt=""
        className="conversationImg"
      />
      <div className="conversationContainer">
        <span className="conversationName">{friend && friend.username}</span>
        <span className="coversationText">安安幾歲住哪</span>
      </div>
    </div>
  );
}
