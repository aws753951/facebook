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

export default function Post({ post }) {
  // 針對該貼文的poster
  const [currentUser, setCurrentUser] = useState({});
  const [likes, setLikes] = useState(post.goods.likes.length);
  const [loves, setLoves] = useState(post.goods.loves.length);
  // set isLiked for not always fetching counts from database.
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);

  const [cancel, setCancel] = useState(false);
  const handleCancel = () => {
    setCancel(false);
  };

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

  const handlePost = (e) => {
    e.stopPropagation();
    setCancel(true);
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

  return (
    <div className="post" onClick={handleCancel}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${currentUser._id}`}>
              <img
                src={
                  currentUser.profilePicture
                    ? require(`../../images/profilePicture/${currentUser.profilePicture}`)
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
              onClick={handlePost}
            />
            {cancel && (
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
            <img
              src={require(`../../images/postPicture/${post.img}`)}
              alt=""
              className="postImg"
            />
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
              {/* <span className="messageCount">{item.comment}則留言</span> */}
              <span className="shareCount">17則分享</span>
            </div>
          </div>
          <hr className="postBottomHr" />
          <div className="postBottomComments">
            <div className="postBottomComment" onClick={handleLikes}>
              <ThumbUpOffAltIcon className="postBottomCommentIcon" />
              <span className="postBottomCommentAct">讚</span>
            </div>
            <div className="postBottomComment">
              <ChatBubbleOutlineIcon className="postBottomCommentIcon" />
              <span className="postBottomCommentAct">留言</span>
            </div>
            <div className="postBottomComment">
              <ReplyIcon className="postBottomCommentIcon" />
              <span className="postBottomCommentAct">分享</span>
            </div>
          </div>
          <div className="postBottomDetail"></div>
        </div>
      </div>
    </div>
  );
}
