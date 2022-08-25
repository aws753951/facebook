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
import SendIcon from "@mui/icons-material/Send";
import ChatPersonInfo from "../../components/chatpersoninfo/ChatPersonInfo";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";
import { io } from "socket.io-client";

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [logout, setLogout] = useState(false);

  // show all conversations in array.
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosInstance.get(`/conversations/${user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  // showing in chatplace when choosing conversation, and need to fetch all messages
  const [currentChat, setCurrentChat] = useState(null);
  // 只是檢查該對話框是否有大頭照
  const [pic, setPic] = useState("");

  useEffect(() => {
    setCurrentChat(conversations[0]);
  }, [conversations]);

  useEffect(() => {
    const other = currentChat?.members.filter((m) => m !== user._id);
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/?userID=${other}`);
        if (res.data.profilePicture) {
          setPic(res.data.profilePicture);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat, user._id]);

  // when click the conversation, it will change currenChat, and get all this chat's messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // currentChat._id is conversation._id
        const res = currentChat
          ? await axiosInstance.get(`/messages/${currentChat._id}`)
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
          const res = await axiosInstance.get(`/users/?userID=${friendID}`);
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

      socket?.emit("sendMessage", {
        senderID: user._id,
        receiverID: friend._id,
        text: sendMessage,
      });

      try {
        const res = await axiosInstance.post("/messages", message);
        // using ... will draw datas from array, so need to add [] back.
        // on every click only send one messagem so no need to use prev=>set(prev...)
        // *****************************************************************************************
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

  // when reaching messenger page, trigger socket.io to certain port.
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([]);

  useEffect(() => {
    setSocket(io("https://fakebookformarc.herokuapp.com/"));
  }, []);

  useEffect(() => {
    // 使用socket(socket) 傳送訊息到伺服器，頻道為"add user"，傳送內容為此人的id  ---- 1
    socket?.emit("add user", user._id);
    // 同時接收"getUsers"這個頻道的東西，伺服器傳來東西我們用users代替 ---- 6
    socket?.on("getUsers", (users) => {
      setOnlineUser(users.map((user) => user.userID));
    });
  }, [user._id, socket]);

  // ****** above is the same as below

  // const socket = useRef();

  const [arrivedMessage, setArrivedMessage] = useState(null);

  useEffect(() => {
    // 使用socket
    // socket = io("ws://localhost:6970");
    // 接收訊息順便寫在這邊
    socket?.on("getMessage", (data) => {
      // 若有收到新訊息，基本上socket不管你是在哪個currentChat,都會傳進來，state皆處理現用戶端網頁的頁面而已
      setArrivedMessage({
        senderID: data.senderID,
        text: data.text,
        // when not refreshing & not click another currentChat, it will show js date
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  // 此為針對該currentChat有人傳訊息過來使用的，非該currentChat的訊息透過上述另個useEffect(從資料庫拉的)更新messages state
  useEffect(() => {
    arrivedMessage &&
      currentChat?.members.includes(arrivedMessage.senderID) &&
      // 使用prev=>操作prev in setMessages   => 該方法會記得前一個state疊加運作，每一次都會重新跑setMessages，確保訊息沒遺失
      // 目前影響不大，主要在於傳進來的訊息都是一條一條的，並沒有同一useEffect內set兩次
      setMessages((prev) => [...prev, arrivedMessage]);
  }, [arrivedMessage, currentChat]);

  return (
    <>
      <Nav logout={logout} setLogout={setLogout} />
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
                <Conversation
                  conversation={conversation}
                  user={user}
                  messages={messages}
                />
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
                      <img
                        src={
                          friend?.profilePicture
                            ? friend?.profilePicture
                            : require("../../images/noAvatar.png")
                        }
                        alt=""
                      />
                      <div className="messagePersonContent">
                        <span className="messageName">
                          {friend && friend.username}
                        </span>
                        <span className="messageTime">
                          {onlineUsers.includes(friend?._id)
                            ? "目前在線上"
                            : "下線"}
                        </span>
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
                          pic={pic}
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
                <ChatPersonInfo friend={friend} onlineUsers={onlineUsers} />
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
