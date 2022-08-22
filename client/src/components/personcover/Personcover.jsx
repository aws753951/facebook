import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MessageIcon from "@mui/icons-material/Message";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Personcover({ currentUser, setEdit }) {
  // after finishing setting in AuthReducers, we need dispatch to set state
  const { user, dispatch } = useContext(AuthContext);
  const [added, setAdded] = useState();

  useEffect(() => {
    setAdded(user.addfriends.includes(currentUser._id));
    // 1. follow or unfollow change state.user 2. currentUser dont change at first, so need to check it until it come in.
  }, [user.addfriends, currentUser._id]);

  const handleAddFriend = async () => {
    try {
      if (added) {
        await axios.put(`/users/${currentUser._id}/addFriend`, {
          _id: user._id,
        });
        dispatch({ type: "UNFRIENDS", payload: currentUser._id });
      } else {
        await axios.put(`/users/${currentUser._id}/addFriend`, {
          _id: user._id,
        });
        dispatch({ type: "ADDFRIENDS", payload: currentUser._id });
      }
    } catch (err) {
      console.log(err);
    }
    setAdded(!added);
  };

  return (
    <div className="personcover">
      <div className="personWrapper">
        <div className="profileTop">
          <img
            src={
              currentUser.profilePicture
                ? `http://localhost:6969/api/users/buffer/covers/${currentUser._id}`
                : require("../../assets/defaultCover.png")
            }
            alt=""
            className="profileCoverImg"
          />
          <div className="profileMiddle">
            <div className="profileMiddleTop">
              <div className="profileMiddleTopLeft">
                <img
                  src={
                    currentUser.profilePicture
                      ? `http://localhost:6969/api/users/buffer/photos/${currentUser._id}`
                      : require("../../assets/noAvatar.png")
                  }
                  alt=""
                  className="profileUserImg"
                />
              </div>
              <div className="profileMiddleTopCenter">
                <div className="profileUserInfos">
                  <h4 className="profileUsername">{currentUser.username}</h4>
                  <span className="profileFriendsCount">
                    {currentUser.addfriends && currentUser.addfriends.length}
                    位朋友
                  </span>
                  <div className="profileUserSmallImgs">
                    {currentUser.addfriends &&
                      currentUser.addfriends.map((u) => (
                        <img
                          key={u._id}
                          src={
                            u.profilePicture
                              ? require(u.profilePicture)
                              : require("../../assets/noAvatar.png")
                          }
                          alt=""
                          className="profileUserSmallImg"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="profileMiddleTopRight">
                {user.username === currentUser.username && (
                  <button
                    className="editProfile"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEdit(true);
                    }}
                  >
                    <EditIcon />
                    <span>編輯檔案</span>
                  </button>
                )}

                {user.username !== currentUser.username && (
                  <button className="addFriend" onClick={handleAddFriend}>
                    {added ? <PeopleAltIcon /> : <PersonAddIcon />}
                    {added ? <span>朋友</span> : <span>加朋友</span>}
                  </button>
                )}
                {user.username !== currentUser.username && (
                  <button className="sendMessage">
                    <MessageIcon />
                    <span> 發送訊息</span>
                  </button>
                )}
              </div>
            </div>
            <hr className="profileMiddleHr" />
            <div className="profileMiddleBottom">
              <div className="profileMiddleBottomLeft">
                <span className="profileMiddleBottomText">貼文</span>
                <span className="profileMiddleBottomText">關於</span>
                <span className="profileMiddleBottomText">朋友</span>
                <span className="profileMiddleBottomText">相片</span>
                <span className="profileMiddleBottomText">影片</span>
                <span className="profileMiddleBottomText">打卡動態</span>
                <span className="profileMiddleBottomText">更多</span>
              </div>
              <div className="profileMiddleBottomRight">
                <MoreHorizIcon className="moreHorizIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
