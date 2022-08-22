import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import RedeemIcon from "@mui/icons-material/Redeem";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Nav() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const navigateToHome = () => {
    navigate("/");
    window.location.reload();
  };

  const navigateToMessenger = () => {
    navigate("/messenger");
    window.location.reload();
  };
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <div className="navbarIconItem0">
          <FacebookOutlinedIcon
            className="facebookIcon"
            onClick={navigateToHome}
          />
        </div>
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search Fakebook" className="searchInput" />
        </div>
      </div>
      <div className="navbarCenter">
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <HomeIcon className="navbarImg" />
          </div>
          <div className="navbarIconItem">
            <OndemandVideoIcon className="navbarImg" />
          </div>
          <div className="navbarIconItem">
            <RedeemIcon className="navbarImg" />
          </div>
          <div className="navbarIconItem">
            <GroupsIcon className="navbarImg" />
          </div>
          <div className="navbarIconItem">
            <SportsEsportsIcon className="navbarImg" />
          </div>
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarIcons2">
          <div className="navbarIconItem2">
            <AddIcon className="navbarImg" />
          </div>
          <div className="navbarIconItem2">
            <ChatIcon className="navbarImg" onClick={navigateToMessenger} />
            <span className="navbarIconBadge">2</span>
          </div>
          <div className="navbarIconItem2">
            <NotificationsIcon className="navbarImg" />
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIconItem2">
            <Link to={`/profile/${user._id}`}>
              <img
                src={
                  user.profilePicture
                    ? `http://localhost:6969/api/users/buffer/photos/${user._id}`
                    : require("../../assets/noAvatar.png")
                }
                alt=""
                className="profile"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
