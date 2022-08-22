import Nav from "../../components/navbar/Nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Search() {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const username = useParams().username;
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/search/?username=${username}`);
      setFoundUsers(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Nav />
      <div className="Search">
        <div className="searchWrapper">
          {foundUsers.length === 0 && (
            <>
              <div>無你搜尋的人物</div>
            </>
          )}
          {foundUsers &&
            foundUsers.map((foundUser) => (
              <div className="person">
                <div className="img">
                  <img
                    src={
                      foundUser.profilePicture
                        ? `http://localhost:6969/api/users/buffer/photos/${foundUser._id}`
                        : require("../../assets/person/noAvatar.png")
                    }
                    alt=""
                  />
                </div>
                <div className="info">
                  <div>
                    <Link
                      to="/messenger"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "800",
                      }}
                    >
                      <span>{foundUser.username}</span>
                    </Link>
                  </div>
                  {foundUser?.desc && <span>{foundUser.desc}</span>}
                </div>
                <div className="addFriend">
                  {foundUser._id === user._id && (
                    <button
                      onClick={() => {
                        navigate(`/profile/${foundUser._id}`);
                      }}
                    >
                      查看個人檔案
                    </button>
                  )}
                  {foundUser._id !== user._id &&
                    !user.addfriends.includes(foundUser._id) && (
                      <button
                        onClick={async () => {
                          await axios.put(`/users/${foundUser._id}/addFriend`, {
                            _id: user._id,
                          });
                          dispatch({
                            type: "ADDFRIENDS",
                            payload: foundUser._id,
                          });
                        }}
                      >
                        加朋友
                      </button>
                    )}
                  {foundUser._id !== user._id &&
                    user.addfriends.includes(foundUser._id) && (
                      <button
                        onClick={() => {
                          const addConversation = async () => {
                            try {
                              await axios.post("/conversations", {
                                senderID: user._id,
                                receiverID: foundUser._id,
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
                        發訊息
                      </button>
                    )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
