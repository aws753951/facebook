import Personcover from "../../components/personcover/Personcover";
import Personinfo from "../../components/personinfo/Personinfo";
import Nav from "../../components/navbar/Nav";
import Centerbar from "../../components/centerbar/Centerbar";
import { useParams } from "react-router-dom";
import { axiosInstance, axiosUpload } from "../../config";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
const FormData = global.FormData;

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [edit, setEdit] = useState(false);
  // 該photo 只能給新增圖片時使用，「一開始檢驗有無照片」得用user.profilePicture判別
  const [photo, setPhoto] = useState("");
  const [cover, setCover] = useState("");
  const [logout, setLogout] = useState(false);
  const [cancel, setCancel] = useState(false);

  // using react Route path
  const userID = useParams().userID;
  useEffect(() => {
    const fetchUser = async () => {
      // 由於需要檢視不同人的頁面，才適用跟伺服器拿資料，至於更新圖片等，可透過state節省資源浪費
      const res = await axiosInstance.get(`/users/?userID=${userID}`);
      setCurrentUser(res.data);
    };
    fetchUser();
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo) {
      const sendPhoto = async () => {
        let formData = new FormData();
        formData.append("file", photo);
        try {
          const res = await axiosUpload.post(`/upload`, formData);
          // 更新state，並存入localstorage
          user.profilePicture = res.data;
          localStorage.setItem("user", JSON.stringify(user));
          await axiosInstance.put(`/users/${user._id}`, {
            _id: user._id,
            profilePicture: res.data,
          });
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
      sendPhoto();
    }
    if (cover) {
      const sendCover = async () => {
        let formData = new FormData();
        formData.append("file", cover);
        try {
          const res = await axiosUpload.post(`/upload`, formData);
          // 更新state，並存入localstorage
          user.coverPicture = res.data;
          localStorage.setItem("user", JSON.stringify(user));
          await axiosInstance.put(`/users/${user._id}`, {
            _id: user._id,
            coverPicture: res.data,
          });
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
      sendCover();
    }
  };

  return (
    <>
      <Nav logout={logout} setLogout={setLogout} />
      <div
        className="profile"
        onClick={(e) => {
          setCancel(false);
          e.stopPropagation();
        }}
      >
        {edit && (
          <>
            <div className="editPage">
              <div className="editWrapper">
                <div className="editContainer">
                  <span>編輯個人檔案</span>
                  <ClearIcon
                    className="Icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEdit(false);
                    }}
                  />
                </div>
                <hr className="editHr" />
                <div className="editPhoto">
                  <div className="title">
                    <span>大頭貼照</span>
                    <label htmlFor="photo" className="edit">
                      <span>編輯</span>
                      <input
                        type="file"
                        // laber htmlFor="id" ************
                        style={{ display: "none" }}
                        id="photo"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => {
                          if (e.target.files[0].size > 500000) {
                            window.alert("請上傳低於0.5MB的照片");
                          } else {
                            setPhoto(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="picture">
                    {!user?.profilePicture && (
                      <img
                        className="imgUploading"
                        src={
                          photo
                            ? URL.createObjectURL(photo)
                            : require(`../../images/noAvatar.png`)
                        }
                        alt=""
                      />
                    )}
                    {user?.profilePicture && (
                      <img
                        className="imgUploading"
                        src={
                          photo
                            ? URL.createObjectURL(photo)
                            : user?.profilePicture
                        }
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div className="editCover">
                  <div className="title">
                    <span>封面照片</span>
                    <label htmlFor="file" className="edit">
                      <span>編輯</span>
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
                            setCover(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="picture">
                    {!user?.coverPicture && (
                      <img
                        className="imgUploading"
                        src={
                          cover
                            ? URL.createObjectURL(cover)
                            : require(`../../images/defaultCover.png`)
                        }
                        alt=""
                      />
                    )}
                    {user?.coverPicture && (
                      <img
                        className="imgUploading"
                        src={
                          cover ? URL.createObjectURL(cover) : user.coverPicture
                        }
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div className="button" onClick={handleSubmit}>
                  <span className="">更新個人照片或封面</span>
                </div>
              </div>
            </div>
            <div className="filter"></div>
          </>
        )}
        <div className="profileWrapper">
          <div className="profileTop">
            <Personcover currentUser={currentUser} setEdit={setEdit} />
          </div>

          <div className="profileBottom">
            <div className="profileBottomLeft">
              <Personinfo currentUser={currentUser} />
            </div>
            <div className="profileBottomRight">
              <Centerbar
                user={user}
                userID={userID}
                cancel={cancel}
                setCancel={setCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
