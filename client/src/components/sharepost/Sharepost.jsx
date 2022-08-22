import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
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
    // check post has sth
    if (desc.current.value || file) {
      let formData = new FormData();
      formData.append("userID", user._id);
      formData.append("desc", desc.current.value);
      if (file) {
        formData.append("file", file);
      }
      try {
        await axios.post("/posts/upload", formData);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  return (
    <div className="sharepost">
      <div className="sharepostWrapper">
        <div className="sharepostTop">
          <Link to={`/profile/${user._id}`}>
            <img
              src={
                user.profilePicture
                  ? `http://localhost:6969/api/users/buffer/photos/${user._id}`
                  : require("../../assets/noAvatar.png")
              }
              alt=""
              className="ProfileImg"
            />
          </Link>
          <textarea
            // https://stackoverflow.com/questions/17772260/textarea-auto-height
            onChange={(e) => {
              e.target.style.height = "5px";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder={`${user.username} 你在想甚麼?`}
            className="sharepostInput"
            ref={desc}
          />
        </div>
        {file && (
          <div className="imgUploadingContainer">
            <img
              className="imgUploading"
              src={URL.createObjectURL(file)}
              alt=""
            />
            <ClearIcon
              className="imgCancelIcon"
              onClick={() => {
                setFile(null);
              }}
            />
          </div>
        )}
        <hr className="sharepostHr" />

        <form className="sharepostBottom" onSubmit={handleSubmit}>
          {/* ******************* */}
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
                if (e.target.files[0].size > 500000) {
                  window.alert("請上傳低於0.5MB的照片");
                } else {
                  setFile(e.target.files[0]);
                }
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
