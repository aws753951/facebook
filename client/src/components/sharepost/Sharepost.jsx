import profile from "../../assets/profile.jpg";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
const FormData = global.FormData;

export default function Sharepost() {
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userID: user._id,
      desc: desc.current.value,
    };
    if (file) {
      // 這沒錯 formdata可用 data.get("file")取得東西 --------1
      let formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append("name", fileName);
      formData.append("file", file);
      newPost.img = fileName;

      try {
        // 可能錯在傳過去後無法正確解讀 --------2  axios 跟formdata
        await axios.post("/api/upload", formData);
      } catch (err) {}
    } else {
      try {
        await axios.post("/posts", newPost);
      } catch (err) {}
    }
  };
  return (
    <div className="sharepost">
      <div className="sharepostWrapper">
        <div className="sharepostTop">
          <Link to={`/profile/${user.username}`}>
            <img src={profile} alt="" className="ProfileImg" />
          </Link>
          <input
            placeholder={`${user.username} 你在想甚麼?`}
            className="sharepostInput"
            ref={desc}
          />
        </div>
        <hr className="sharepostHr" />
        <form className="sharepostBottom" onSubmit={handleSubmit}>
          <label htmlFor="file" className="sharepostOption">
            <AddPhotoAlternateOutlinedIcon className="sharepostIcon photoColor" />
            <span className="sharepostOptionText">相片/影片</span>
            <input
              type="file"
              // laber htmlFor="id" ************
              style={{ display: "none" }}
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
          <div className="sharepostOption">
            <GroupAddOutlinedIcon className="sharepostIcon friendColor" />
            <span className="sharepostOptionText">標註朋友</span>
          </div>
          <div className="sharepostOption">
            <EmojiEmotionsOutlinedIcon className="sharepostIcon feelingColor" />
            <span className="sharepostOptionText">感受/活動</span>
          </div>
          <button className="sharepostButton" type={"submit"}>
            發布貼文
          </button>
        </form>
      </div>
    </div>
  );
}
