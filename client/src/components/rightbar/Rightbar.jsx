import CakeIcon from "@mui/icons-material/Cake";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Rightbar({ user }) {
  const [friend, setFriend] = useState([]);

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
              <b>蔡英文</b>和<b>習近平</b>都是今天生日
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
            {friend &&
              friend.map((f) => (
                <li key={f._id} className="rigthbarFriendsListItem">
                  <div className="rightbarFriendsContainer">
                    <img
                      src={require(`../../assets/noAvatar.png`)}
                      alt=""
                      className="ProfileImg"
                    />
                    <span className="onlineLight"></span>
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
