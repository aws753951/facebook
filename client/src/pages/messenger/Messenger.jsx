import Nav from "../../components/navbar/Nav";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Conversation from "../../components/conversations/Conversation";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import Message from "../../components/message/Message";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import GifBoxIcon from "@mui/icons-material/GifBox";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SendIcon from "@mui/icons-material/Send";
import ChatPersonInfo from "../../components/chatpersoninfo/ChatPersonInfo";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Messenger() {
  const { user } = useContext(AuthContext);

  // show all conversations in array.
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  // showing in chatplace when choosing conversation, and need to fetch all messages
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    setCurrentChat(conversations[0]);
  }, [conversations]);

  // when click the conversation, it will change currenChat, and get all this chat's messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // currentChat._id is conversation._id
        const res = currentChat
          ? await axios.get(`/messages/${currentChat._id}`)
          : "";
        // get all messages (array) from currentChat, and put these messages into <Message/> with prop own to check whether senderID === user
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // get currentChat's user info
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    if (currentChat) {
      const friendID = currentChat.members.find((c) => c !== user._id);
      const getUser = async () => {
        try {
          const res = await axios.get(`/users/?userID=${friendID}`);
          setFriend(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
  }, [user, currentChat]);

  // send new message
  const [sendMessage, setSendMessage] = useState("");

  const handleSubmit = async (e) => {
    // don't refresh page
    e.preventDefault();
    if (sendMessage) {
      const message = {
        conversationID: currentChat._id,
        senderID: user._id,
        text: sendMessage,
      };
      try {
        const res = await axios.post("/messages", message);
        // using ... will draw datas from array, so need to add [] back.
        setMessages([...messages, res.data]);
        setSendMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // make message showing the newest message
  // useRef to do being DOM with scrollToNew.current, so when using if should use if (scrollToNew.current){}
  const scrollToNew = useRef();

  useEffect(() => {
    if (scrollToNew.current) {
      scrollToNew.current.scrollIntoView();
    }
    // both of users send message should trigger effect.
  }, [messages]);

  return (
    <>
      <Nav />
      <div className="messenger">
        <div className="chatRoom">
          <div className="chatRoomWrapper">
            <div className="chatRoomInfo">
              <span>聊天室</span>
              <div className="chatRoomIcons">
                <MoreHorizIcon className="Icon" />
                <OndemandVideoIcon className="Icon" />
                <NoteAltIcon className="Icon" />
              </div>
            </div>
            <div className="searchBarContainers">
              <div className="searchBar">
                <SearchIcon className="SearchIcon" />
                <input
                  type="text"
                  className="chatRootSearch"
                  placeholder="搜尋Fakebook"
                />
              </div>
            </div>
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => {
                  setCurrentChat(conversation);
                }}
              >
                <Conversation conversation={conversation} user={user} />
              </div>
            ))}
          </div>
        </div>
        {currentChat ? (
          <>
            <div className="chatPlace">
              <div className="chatPlaceWrapper">
                <div className="messageTop">
                  <div className="messageInfo">
                    <div className="messagePerson">
                      <img src={require("../../assets/person/8.jpeg")} alt="" />
                      <div className="messagePersonContent">
                        <span className="messageName">
                          {friend && friend.username}
                        </span>
                        <span className="messageTime">5分鐘前</span>
                      </div>
                    </div>
                    <div className="messageIcons">
                      <CallIcon className="Icon" />
                      <VideocamIcon className="Icon" />
                      <InfoIcon className="Icon" />
                    </div>
                  </div>
                </div>
                <div className="messageMiddle">
                  {messages &&
                    messages.map((message) => (
                      <div key={message._id} ref={scrollToNew}>
                        <Message
                          message={message}
                          own={message.senderID === user._id}
                        />
                      </div>
                    ))}
                </div>
                <div className="messageBottom">
                  <AddCircleIcon className="Icon" />
                  <InsertPhotoIcon className="Icon" />
                  <GifBoxIcon className="Icon" />
                  <form className="chatContainer" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className="chat"
                      placeholder="Aa"
                      onChange={(e) => {
                        setSendMessage(e.target.value);
                      }}
                      // after sending, it will be clear with setSendMessage
                      value={sendMessage}
                    />
                  </form>
                  <SendIcon className="Icon" onClick={handleSubmit} />
                </div>
              </div>
            </div>
            <div className="chatPerson">
              <div className="chatPersonWrapper">
                <ChatPersonInfo friend={friend} />
              </div>
            </div>
          </>
        ) : (
          <div className="noConversation">
            <span>選擇聊天室或開始新對話</span>
          </div>
        )}
      </div>
    </>
  );
}
