import profile from "../../assets/profile.jpg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import picture from "../../assets/example.jpg";
import like from "../../assets/like.png";
import love from "../../assets/heart.png";

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
          <div className="postBottomComments"></div>
          <div className="postBottomDetail"></div>
        </div>
      </div>
    </div>
  );
}
