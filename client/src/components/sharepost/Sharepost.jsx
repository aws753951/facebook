import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import { axiosInstance, axiosUpload } from "../../config";

export default function Sharepost() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  // PO文並檢查是否有檔案或內容，擇一即可
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userID: user._id,
      desc: desc.current.value,
    };
    // check post has sth
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axiosUpload.post("/uploadpost", data);
      } catch (err) {}
    }
    // 就算只有file，也要記錄其img的名稱
    try {
      await axiosInstance.post("/posts", newPost);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <div className="sharepost">
      <div className="sharepostWrapper">
        <div className="sharepostTop">
          <Link to={`/profile/${user._id}`}>
            <img
              src={
                user.profilePicture
                  ? require(`../../images/profilePicture/${user.profilePicture}`)
                  : require("../../images/noAvatar.png")
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
