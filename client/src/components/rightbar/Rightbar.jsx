import CakeIcon from "@mui/icons-material/Cake";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Users } from "../../dummy";

export default function rightbar() {
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
            {Users.map((u) => (
              <li key={u.id} className="rigthbarFriendsListItem">
                <div className="rightbarFriendsContainer">
                  <img
                    src={require(`../../assets/${u.profilePicture}`)}
                    alt=""
                    className="ProfileImg"
                  />
                  <span className="onlineLight"></span>
                </div>
                <span className="rightbarFriendName">{u.username}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
