import { Users } from "../../dummy";

export default function Personinfo() {
  return (
    <div className="personinfo">
      <div className="personinfoWrapper">
        <div className="personinfoProfile">
          <h4>簡介</h4>
          <button className="addPersoninfo">新增個人簡介</button>
        </div>
        <div className="personinfoFriends">
          <div className="personinfoFriendsFunc">
            <h4>朋友</h4>
            <span className="more">查看所有朋友</span>
          </div>
          <span className="personinfoFriendsCount">807位朋友</span>
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
