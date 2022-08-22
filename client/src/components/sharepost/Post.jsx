import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import like from "../../assets/like.png";
import love from "../../assets/heart.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [currentUser, setCurrentUser] = useState({});
  const [likes, setLikes] = useState(post.goods.likes.length);
  const [loves, setLoves] = useState(post.goods.loves.length);
  const [hates, setHates] = useState(post.goods.hates.length);
  // set isLiked for not always fetching counts from database.
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useContext(AuthContext);

  const [cancel, setCancel] = useState(false);
  const handleCancel = (e) => {
    setCancel(false);
  };

  const handleLikes = async () => {
    try {
      // dont use e.target.id, better using props to fetch post._id
      await axios.put(`/posts/${post._id}/likes`, {
        userID: user._id,
      });
    } catch (err) {}
    // only for this currentUser using, it will change a lot when refreshing
    // if isLiked = true, likes -1
    setLikes(!isLiked ? likes + 1 : likes - 1);
    // if false, turn true and the vice verse in "every post"
    // it will coordinate with next useEffect to set the initial isLiked
    setIsLiked(!isLiked);
  };

  const handlePost = (e) => {
    e.stopPropagation();
    setCancel(true);
  };

  const deletePost = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        // https://stackoverflow.com/questions/51069552/axios-delete-request-with-body-and-headers
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
    // if exist,then isLiked turn true
    setIsLiked(post.goods.likes.includes(user._id));
  }, [user._id, post.goods.likes]);

  useEffect(() => {
    // ***
    axios.get(`/users/?userID=${post.userID}`).then((u) => {
      setCurrentUser(u.data);
    });
  }, [post.userID]);

  // useEffect(() => {
  //   console.log(cancel);
  //   console.log(xcancel);
  // }, [cancel, xcancel]);

  return (
    <div className="post" onClick={handleCancel}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${currentUser._id}`}>
              <img
                src={
                  currentUser.profilePicture
                    ? `http://localhost:6969/api/users/buffer/photos/${currentUser._id}`
                    : require("../../assets/noAvatar.png")
                }
                alt=""
                className="ProfileImg"
              />
            </Link>
            <div className="profileInfo">
              <Link
                to={`/profile/${currentUser.username}`}
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
              src={`http://localhost:6969/api/posts/buffer/${post._id}`}
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
