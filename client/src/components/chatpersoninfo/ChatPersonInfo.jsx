import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

export default function ChatPersonInfo({ friend, onlineUsers }) {
  return (
    <div className="chatpersoninfo">
      <div className="chatpersoninfoWrapper">
        <div className="person">
          <img
            src={
              friend?.profilePicture
                ? require(`../../images/profilePicture/${friend.profilePicture}`)
                : require("../../images/noAvatar.png")
            }
            alt=""
            className="img"
          />
          <span className="name">{friend && friend.username}</span>
          <span className="time">
            {onlineUsers && onlineUsers.includes(friend?._id)
              ? "目前在線上"
              : "下線"}
          </span>
        </div>
        <div className="personInfo">
          <div className="Icons">
            <div className="IconContainer">
              <AccountBoxIcon className="Icon" />
              <span>個人檔案</span>
            </div>
            <div className="IconContainer">
              <NotificationsIcon className="Icon" />
              <span>關閉通知</span>
            </div>
            <div className="IconContainer">
              <SearchIcon className="Icon" />
              <span>搜尋</span>
            </div>
          </div>
        </div>
        <div className="moreFunc">太多了先不做</div>
      </div>
    </div>
  );
}
