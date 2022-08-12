import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function Personcover() {
  return (
    <div className="personcover">
      <div className="personWrapper">
        <div className="profileTop">
          <img
            src={require("../../assets/post/8.jpeg")}
            alt=""
            className="profileCoverImg"
          />
          <div className="profileMiddle">
            <div className="profileMiddleTop">
              <div className="profileMiddleTopLeft">
                <img
                  src={require("../../assets/person/2.jpeg")}
                  alt=""
                  className="profileUserImg"
                />
              </div>
              <div className="profileMiddleTopCenter">
                <div className="profileUserInfos">
                  <h4 className="profileUsername">朱鴻埕</h4>
                  <span className="profileFriendsCount">807朋友</span>
                  <div className="profileUserSmallImgs">
                    <img
                      src={require("../../assets/person/2.jpeg")}
                      alt=""
                      className="profileUserSmallImg"
                    />
                    <img
                      src={require("../../assets/person/2.jpeg")}
                      alt=""
                      className="profileUserSmallImg"
                    />
                    <img
                      src={require("../../assets/person/2.jpeg")}
                      alt=""
                      className="profileUserSmallImg"
                    />
                    <img
                      src={require("../../assets/person/2.jpeg")}
                      alt=""
                      className="profileUserSmallImg"
                    />
                  </div>
                </div>
              </div>
              <div className="profileMiddleTopRight">
                <div className="editProfile">
                  <EditIcon className="editIcon" />
                  <span className="editProfileText">編輯檔案</span>
                </div>
              </div>
            </div>
            <hr className="profileMiddleHr" />
            <div className="profileMiddleBottom">
              <div className="profileMiddleBottomLeft">
                <span className="profileMiddleBottomText">貼文</span>
                <span className="profileMiddleBottomText">關於</span>
                <span className="profileMiddleBottomText">朋友</span>
                <span className="profileMiddleBottomText">相片</span>
                <span className="profileMiddleBottomText">影片</span>
                <span className="profileMiddleBottomText">打卡動態</span>
                <span className="profileMiddleBottomText">更多</span>
              </div>
              <div className="profileMiddleBottomRight">
                <MoreHorizIcon className="moreHorizIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}