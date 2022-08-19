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

export default function Messenger() {
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

            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatPlace">
          <div className="chatPlaceWrapper">
            <div className="messageTop">
              <div className="messageInfo">
                <div className="messagePerson">
                  <img src={require("../../assets/person/8.jpeg")} alt="" />
                  <div className="messagePersonContent">
                    <span className="messageName">妹子</span>
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
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="messageBottom">
              <AddCircleIcon className="Icon" />
              <InsertPhotoIcon className="Icon" />
              <GifBoxIcon className="Icon" />
              <div className="chatContainer">
                <input type="text" className="chat" placeholder="Aa" />
              </div>

              {/* <TagFacesIcon /> */}
              <SendIcon className="Icon" />
            </div>
          </div>
        </div>
        <div className="chatPerson">
          <div className="chatPersonWrapper">
            <ChatPersonInfo />
          </div>
        </div>
      </div>
    </>
  );
}
