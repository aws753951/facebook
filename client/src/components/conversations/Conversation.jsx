import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";

export default function Conversation({ conversation, user, messages }) {
  const [friend, setFriend] = useState(null);
  const [lastmsg, setLastmsg] = useState("");

  useEffect(() => {
    const friendID = conversation.members.find((c) => c !== user._id);
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/?userID=${friendID}`);
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    const getMsg = async () => {
      try {
        const res = await axiosInstance.get(
          `/messages/lastmsg/${conversation._id}`
        );
        setLastmsg(res.data.text);
      } catch (err) {
        console.log(err);
      }
    };
    getMsg();
  }, [conversation, user]);

  return (
    <div className="conversation">
      <img
        src={
          friend?.profilePicture
            ? require(`../../images/profilePicture/${friend.profilePicture}`)
            : require("../../images/noAvatar.png")
        }
        alt=""
        className="conversationImg"
      />
      <div className="conversationContainer">
        <span className="conversationName">{friend && friend.username}</span>
        <span className="coversationText">{lastmsg}</span>
      </div>
    </div>
  );
}
