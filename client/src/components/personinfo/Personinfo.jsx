import { axiosInstance } from "../../config";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Personinfo({ currentUser }) {
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axiosInstance.get(
          `/users/friends/${currentUser._id}`
        );
        setFriend(friendsList?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser._id]);

  return (
    <div className="personinfo">
      <div className="personinfoWrapper">
        <div className="personinfoProfile">
          <h4>簡介</h4>
          <span className="personinfoProfileDesc">{currentUser.desc}</span>
          <button className="addPersoninfo">編輯個人簡介</button>
          <div className="personinfoList">
            <ul className="personinfoListItems">
              {/* <li className="personinfoListItem">
                <LocationCityIcon className="Icon" />
                <span className="IconText">{currentUser.city}</span>
              </li>
              <li className="personinfoListItem">
                <SchoolIcon className="Icon" />
                <span className="IconText">{currentUser.education}</span>
              </li>
              <li className="personinfoListItem">
                <FavoriteIcon className="Icon" />
                <span className="IconText">{currentUser.relationship}</span>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="personinfoFriends">
          <div className="personinfoFriendsFunc">
            <h4>朋友</h4>
            <span className="more">查看所有朋友</span>
          </div>
          <span className="personinfoFriendsCount">
            {currentUser.addfriends &&
              `${currentUser.addfriends.length} 位朋友`}
          </span>
          <div className="personinfoFriendsPictures">
            {friend.map((u) => (
              <Link
                to={`/profile/${u._id}/`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div key={friend._id} className="FriendsContainer">
                  <img
                    src={
                      u.profilePicture
                        ? u.profilePicture
                        : require("../../images/noAvatar.png")
                    }
                    alt=""
                    className="friendImg"
                  />
                  <span className="rightbarFriendName">{u.username}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
