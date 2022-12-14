import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AuthContext } from "../../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MessageIcon from "@mui/icons-material/Message";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useContext, useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { useNavigate } from "react-router-dom";

export default function Personcover({ currentUser, setEdit }) {
  const navigate = useNavigate();
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
        await axiosInstance.put(`/users/${currentUser._id}/addFriend`, {
          _id: user._id,
        });
        dispatch({ type: "UNFRIENDS", payload: currentUser._id });
      } else {
        await axiosInstance.put(`/users/${currentUser._id}/addFriend`, {
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
              currentUser?.coverPicture
                ? currentUser?.coverPicture
                : require(`../../images/defaultCover.png`)
            }
            alt=""
            className="profileCoverImg"
          />
          <div className="profileMiddle">
            <div className="profileMiddleTop">
              <div className="profileMiddleTopLeft">
                <img
                  src={
                    currentUser?.profilePicture
                      ? currentUser?.profilePicture
                      : require("../../images/noAvatar.png")
                  }
                  alt=""
                  className="profileUserImg"
                />
              </div>
              <div className="profileMiddleTopCenter">
                <div className="profileUserInfos">
                  <h4 className="profileUsername">{currentUser.username}</h4>
                  <span className="profileFriendsCount">
                    {currentUser.addfriends &&
                      `${currentUser.addfriends.length} ?????????`}
                  </span>
                  {/* <div className="profileUserSmallImgs">
                    {currentUser.addfriends &&
                      currentUser.addfriends.map((u) => (
                        <img
                          key={u}
                          src={
                            `http://localhost:6969/api/users/buffer/photos/${u}` ||
                            require("../../assets/noAvatar.png")
                          }
                          alt=""
                          className="profileUserSmallImg"
                        />
                      ))}
                  </div> */}
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
                    <span>????????????</span>
                  </button>
                )}

                {user.username !== currentUser.username && (
                  <button className="addFriend" onClick={handleAddFriend}>
                    {added ? <PeopleAltIcon /> : <PersonAddIcon />}
                    {added ? <span>??????</span> : <span>?????????</span>}
                  </button>
                )}
                {user.username !== currentUser.username && (
                  <button
                    className="sendMessage"
                    onClick={() => {
                      const addConversation = async () => {
                        console.log(user._id);
                        try {
                          await axiosInstance.post("/conversations", {
                            senderID: user._id,
                            receiverID: currentUser._id,
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
                    <MessageIcon />
                    <span> ????????????</span>
                  </button>
                )}
              </div>
            </div>
            <hr className="profileMiddleHr" />
            <div className="profileMiddleBottom">
              <div className="profileMiddleBottomLeft">
                <span className="profileMiddleBottomText">??????</span>
                <span className="profileMiddleBottomText">??????</span>
                <span className="profileMiddleBottomText">??????</span>
                <span className="profileMiddleBottomText">??????</span>
                <span className="profileMiddleBottomText">??????</span>
                <span className="profileMiddleBottomText">????????????</span>
                <span className="profileMiddleBottomText">??????</span>
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
