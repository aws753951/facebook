import { Users } from "../../dummy";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Personinfo({ user2 }) {
  return (
    <div className="personinfo">
      <div className="personinfoWrapper">
        <div className="personinfoProfile">
          <h4>簡介</h4>
          <span className="personinfoProfileDesc">{user2.desc}</span>
          <button className="addPersoninfo">編輯個人簡介</button>
          <div className="personinfoList">
            <ul className="personinfoListItems">
              <li className="personinfoListItem">
                <LocationCityIcon className="Icon" />
                <span className="IconText">{user2.city}</span>
              </li>
              <li className="personinfoListItem">
                <SchoolIcon className="Icon" />
                <span className="IconText">{user2.education}</span>
              </li>
              <li className="personinfoListItem">
                <FavoriteIcon className="Icon" />
                <span className="IconText">{user2.relationship}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="personinfoFriends">
          <div className="personinfoFriendsFunc">
            <h4>朋友</h4>
            <span className="more">查看所有朋友</span>
          </div>
          <span className="personinfoFriendsCount">
            {user2.followings && user2.followings.length}位朋友
          </span>
          <div className="personinfoFriendsPictures">
            {Users.map((u) => (
              <div className="FriendsContainer">
                <img
                  src={require(`../../assets/${u.profilePicture}`)}
                  alt=""
                  className="friendImg"
                />
                <span className="rightbarFriendName">{u.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
