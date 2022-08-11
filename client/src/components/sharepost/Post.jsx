import profile from "../../assets/profile.jpg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import picture from "../../assets/example.jpg";
import like from "../../assets/like.png";
import love from "../../assets/heart.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={profile} alt="" className="ProfileImg" />
            <div className="profileInfo">
              <span className="postUsername">朱鴻埕</span>
              <span className="postDate">
                <p>5 分鐘前．</p>
                <PublicOutlinedIcon className="postDateIcon" />
              </span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreHorizOutlinedIcon className="postMoreIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">第一次PO文，既緊張又害怕</span>
          <img src={picture} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomInfos">
            <div className="postBottomInfosLeft">
              <img src={like} className="likeIcon" alt="" />
              <img src={love} className="likeIcon" alt="" />
              <span className="likeCount">320</span>
            </div>
            <div className="postBottomInfosRight">
              <span className="messageCount">26則留言</span>
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
