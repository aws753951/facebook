import Personcover from "../../components/personcover/Personcover";
import Personinfo from "../../components/personinfo/Personinfo";
import Nav from "../../components/navbar/Nav";
import Centerbar from "../../components/centerbar/Centerbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
const FormData = global.FormData;

export default function Profile() {
  const { user, dispatch } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [cover, setCover] = useState(null);

  // using react Route path
  const userID = useParams().userID;
  useEffect(() => {
    const fetchUser = async () => {
      // fetching form databases, no need to be the same logic of params
      const res = await axios.get(`/users/?userID=${userID}`);
      setCurrentUser(res.data);
    };
    fetchUser();
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photo) {
      const sendPhoto = async () => {
        let formData = new FormData();
        formData.append("userID", user._id);
        formData.append("file", photo);
        try {
          await axios.post("/users/upload/photos", formData);
          dispatch({ type: "ADDPHOTOS", payload: true });
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
        formData.append("userID", user._id);
        formData.append("file", cover);
        try {
          await axios.post("/users/upload/covers", formData);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
      sendCover();
    }
  };

  // }

  return (
    <>
      <Nav />
      <div className="profile">
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
                    <img
                      className="imgUploading"
                      src={
                        photo
                          ? URL.createObjectURL(photo)
                          : `http://localhost:6969/api/users/buffer/photos/${currentUser._id}`
                      }
                      alt=""
                    />
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
                    <img
                      className="imgUploading"
                      src={
                        cover
                          ? URL.createObjectURL(cover)
                          : `http://localhost:6969/api/users/buffer/covers/${currentUser._id}`
                      }
                      alt=""
                    />
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
              <Centerbar user={user} userID={userID} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
