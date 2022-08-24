import CakeIcon from "@mui/icons-material/Cake";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ onlineUsers }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [friends, setFriend] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axiosInstance.get(
          `/users/friends/${user._id}`
        );
        setFriend(friendsList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

  return (
    <div className="rightbarContainer">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <span className="rightbarbirthdayTitle">壽星</span>
          <div className="rightbarbirthdayItem">
            <CakeIcon className="rightbarIcon" />
            <span className="rightbarListItemText">
              <b>周瑜</b>和<b>諸葛亮</b>都是今天生日
            </span>
          </div>
          <hr className="rightbarHr" />
        </div>
        <div className="rightbarFriends">
          <div className="rightbarContact">
            <span className="rightbarContactPerson">聯絡人</span>
            <div className="rightbarContactIcon">
              <VideoCallIcon className="rightbarSmallIcon" />
              <SearchIcon className="rightbarSmallIcon" />
              <MoreHorizIcon className="rightbarSmallIcon" />
            </div>
          </div>
          <ul className="rigthbarFriendsList">
            {friends &&
              friends.map((f) => (
                <li
                  key={f._id}
                  className="rigthbarFriendsListItem"
                  onClick={() => {
                    // 沒建立會議的建立會議，有建立會議的跳轉訊息頁
                    const addConversation = async () => {
                      try {
                        await axiosInstance.post("/conversations", {
                          senderID: user._id,
                          receiverID: f._id,
                        });
                      } catch (err) {
                        console.log(err);
                      }
                    };
                    addConversation();
                    navigate("/messenger");
                    window.location.reload();
                  }}
                >
                  <div className="rightbarFriendsContainer">
                    <img
                      src={
                        f.profilePicture
                          ? require(`../../images/profilePicture/${f.profilePicture}`)
                          : require("../../images/noAvatar.png")
                      }
                      alt=""
                      className="ProfileImg"
                    />
                    {onlineUsers && onlineUsers.includes(f._id) && (
                      <span className="onlineLight"></span>
                    )}
                  </div>
                  <span className="rightbarFriendName">{f.username}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
