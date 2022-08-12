import profile from "../../assets/profile.jpg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import like from "../../assets/like.png";
import love from "../../assets/heart.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import { Users } from "../../dummy";

export default function Post({ item }) {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={require(`../../assets/${
                Users.filter((user) => user.id === item.id)[0].profilePicture
              }`)}
              alt=""
              className="ProfileImg"
            />
            <div className="profileInfo">
              <span className="postUsername">
                {Users.filter((user) => user.id === item.id)[0].username}
              </span>
              <span className="postDate">
                <p>{item.date}．</p>
                <PublicOutlinedIcon className="postDateIcon" />
              </span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreHorizOutlinedIcon className="postMoreIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{item?.desc}</span>
          <img
            src={require(`../../assets/${item.photo}`)}
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomInfos">
            <div className="postBottomInfosLeft">
              <img src={like} className="likeIcon" alt="" />
              <img src={love} className="likeIcon" alt="" />
              <span className="likeCount">{item.like}</span>
            </div>
            <div className="postBottomInfosRight">
              <span className="messageCount">{item.comment}則留言</span>
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
