import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import like from "../../assets/like.png";
import love from "../../assets/heart.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

export default function Post({ post }) {
  const [currentUser, setCurrentUser] = useState({});
  const [likes, setLikes] = useState(post.goods.likes.length);
  const [loves, setLoves] = useState(post.goods.loves.length);
  const [hates, setHates] = useState(post.goods.hates.length);

  useEffect(() => {
    // ***
    axios.get(`/users/?userID=${post.userID}`).then((u) => {
      setCurrentUser(u.data);
    });
  }, [post.userID]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={
                currentUser.profile
                  ? require(currentUser.profile)
                  : require("../../assets/noAvatar.png")
              }
              alt=""
              className="ProfileImg"
            />
            <div className="profileInfo">
              <span className="postUsername">
                {currentUser && currentUser.username}
              </span>
              <span className="postDate">
                <p>{format(post.createdAt, "zh_CN")}．</p>
                <PublicOutlinedIcon className="postDateIcon" />
              </span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreHorizOutlinedIcon className="postMoreIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {currentUser && currentUser.pictures && (
            <img
              src={require(currentUser.pictures)}
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
            <div className="postBottomComment">
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
