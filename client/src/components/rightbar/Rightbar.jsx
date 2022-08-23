import CakeIcon from "@mui/icons-material/Cake";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ onlineUsers }) {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [friends, setFriend] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get(`/users/friends/${user._id}`);
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
                    const addConversation = async () => {
                      try {
                        await axios.post("/conversations", {
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
                          ? `http://localhost:6969/api/users/buffer/photos/${f._id}`
                          : require("../../assets/person/noAvatar.png")
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
