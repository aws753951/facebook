import profile from "../../assets/profile.jpg";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";

export default function Sharepost() {
  return (
    <div className="sharepost">
      <div className="sharepostWrapper">
        <div className="sharepostTop">
          <img src={profile} alt="" className="ProfileImg" />
          <input placeholder="誰誰誰，你在想甚麼?" className="sharepostInput" />
        </div>
        <hr className="sharepostHr" />
        <div className="sharepostBottom">
          <div className="sharepostOption">
            <AddPhotoAlternateOutlinedIcon className="sharepostIcon photoColor" />
            <span className="sharepostOptionText">相片/影片</span>
          </div>
          <div className="sharepostOption">
            <GroupAddOutlinedIcon className="sharepostIcon friendColor" />
            <span className="sharepostOptionText">標註朋友</span>
          </div>
          <div className="sharepostOption">
            <EmojiEmotionsOutlinedIcon className="sharepostIcon feelingColor" />
            <span className="sharepostOptionText">感受/活動</span>
          </div>
          <button className="sharepostButton">發布貼文</button>
        </div>
      </div>
    </div>
  );
}
