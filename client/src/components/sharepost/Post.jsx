import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import like from "../../images/like.png";
import love from "../../images/heart.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Hismessage from "../hismessage/Hismessage";

export default function Post({ post, cancel, setCancel }) {
  // 針對該貼文的poster
  const [currentUser, setCurrentUser] = useState({});
  const [likes, setLikes] = useState(post.goods.likes.length);
  const [loves, setLoves] = useState(post.goods.loves.length);
  // set isLiked for not always fetching counts from database.
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const [xcancel, setXcancel] = useState(false);
  const [leavemsg, setLeavemsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [listmsg, setListmsg] = useState([]);

  useEffect(() => {
    if (!cancel) {
      setXcancel(false);
    }
  }, [cancel]);

  const handleLikes = async () => {
    try {
      // dont use e.target.id, better using props to fetch post._id
      await axiosInstance.put(`/posts/${post._id}/likes`, {
        userID: user._id,
      });
    } catch (err) {}
    setLikes(!isLiked ? likes + 1 : likes - 1);
    setIsLiked(!isLiked);
  };

  const deletePost = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        // https://stackoverflow.com/questions/51069552/axiosInstance-delete-request-with-body-and-headers
        headers: {
          Authorization: "authorizationToken",
        },
        data: { userID: user._id },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLiked(post.goods.likes.includes(user._id));
  }, [user._id, post.goods.likes]);

  useEffect(() => {
    axiosInstance.get(`/users/?userID=${post.userID}`).then((u) => {
      setCurrentUser(u.data);
    });
  }, [post.userID]);

  // 當點開留言後，向後台拿資料並傳到STATE裡
  // 針對每則留言進行資料取得:姓名，大頭照那些
  useEffect(() => {
    if (leavemsg) {
      const fetchMsg = async () => {
        const res = await axiosInstance.get(`/posts/${post._id}`);
        // 回傳每一個留言與userID
        setListmsg(res.data);
        // res.data.forEach(async (item) => {
        //   console.log(item.text);
        //   const res = await axiosInstance.get(`users/?userID=${item.userID}`);
        //   let { _id, username, profilePicture } = res.data;
        //   // *****************************************************************************************
        //   setListmsg((listmsg) => [
        //     ...listmsg,
        //     {
        //       userID: _id,
        //       username,
        //       profilePicture,
        //       text: item.text,
        //     },
        //   ]);
        // });
      };
      fetchMsg();
    }
  }, [leavemsg]);

  // 傳訊息: 到後台以及要更新STATE
  const leaveMsg = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/posts/${post._id}`, {
      userID: user._id,
      text: msg,
      date: Date.now(),
    });
    // 更新state
    setListmsg([
      ...listmsg,
      {
        userID: user._id,
        text: msg,
        date: Date.now(),
      },
    ]);
    setMsg("");
  };

  return (
    <div
      className="post"
      onClick={() => {
        setCancel(false);
        setXcancel(false);
      }}
    >
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${currentUser._id}`}>
              <img
                src={
                  currentUser.profilePicture
                    ? currentUser.profilePicture
                    : require("../../images/noAvatar.png")
                }
                alt=""
                className="ProfileImg"
              />
            </Link>
            <div className="profileInfo">
              <Link
                to={`/profile/${currentUser._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className="postUsername">
                  {currentUser && currentUser.username}
                </span>
              </Link>
              <span className="postDate">
                <p>{format(post.createdAt)}．</p>
                <PublicOutlinedIcon className="postDateIcon" />
              </span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreHorizOutlinedIcon
              className="postMoreIcon"
              onClick={(e) => {
                e.stopPropagation();
                setXcancel(true);
                setCancel(true);
              }}
            />
            {xcancel && (
              <div className="moreContent" onClick={deletePost}>
                <DeleteForeverIcon />
                <span>刪除</span>
              </div>
            )}
          </div>
        </div>
        <div className="postCenter">
          <pre className="postText">{post?.desc}</pre>
          {post && post.img && (
            <img src={post.img} alt="" className="postImg" />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomInfos">
            <div className="postBottomInfosLeft">
              {likes > 0 && <img src={like} className="likeIcon" alt="" />}
              {loves > 0 && <img src={love} className="likeIcon" alt="" />}
              <span className="likeCount">
                {likes + loves > 0 && likes + loves}
              </span>
            </div>
            <div className="postBottomInfosRight">
              {post?.msg && post.msg.length !== 0 && (
                <span className="messageCount">{post.msg.length}則留言</span>
              )}

              {/* <span className="shareCount">17則分享</span> */}
            </div>
          </div>
          <hr className="postBottomHr" />
          <div className="postBottomComments">
            <div className="postBottomComment" onClick={handleLikes}>
              <ThumbUpOffAltIcon className="postBottomCommentIcon" />
              <span className="postBottomCommentAct">讚</span>
            </div>
            <div
              className="postBottomComment"
              onClick={() => {
                setLeavemsg(true);
              }}
            >
              <ChatBubbleOutlineIcon className="postBottomCommentIcon" />
              <span className="postBottomCommentAct">留言</span>
            </div>
            <div className="postBottomComment">
              <ReplyIcon className="postBottomCommentIcon" />
              <span className="postBottomCommentAct">分享</span>
            </div>
          </div>
          {/* ************************************************************************* */}
          <div className="postBottomDetail">
            {/* ******************* */}
            {leavemsg && (
              <>
                <hr />
                {listmsg &&
                  listmsg.map((eachMsg) => <Hismessage eachMsg={eachMsg} />)}

                <div className="message">
                  <div className="left">
                    <img
                      src={
                        user.profilePicture
                          ? user.profilePicture
                          : require("../../images/noAvatar.png")
                      }
                      alt=""
                      className="profile"
                    />
                  </div>
                  <form className="right" onSubmit={leaveMsg}>
                    <input
                      type="text"
                      placeholder="留言......."
                      onChange={(e) => {
                        setMsg(e.target.value);
                      }}
                      value={msg}
                    />
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
