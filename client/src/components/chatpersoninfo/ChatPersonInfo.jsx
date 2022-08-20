import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

export default function ChatPersonInfo({ friend }) {
  return (
    <div className="chatpersoninfo">
      <div className="chatpersoninfoWrapper">
        <div className="person">
          <img
            src={require("../../assets/person/8.jpeg")}
            alt=""
            className="img"
          />
          <span className="name">{friend && friend.username}</span>
          <span className="time">5分鐘前</span>
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
