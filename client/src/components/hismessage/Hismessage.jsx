import { axiosInstance } from "../../config";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";

export default function Hismessage({ eachMsg }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const fetchPic = async () => {
      const res = await axiosInstance.get(`/users/?userID=${eachMsg.userID}`);
      setCurrentUser({
        username: res.data.username,
        profilePicture: res.data.profilePicture,
        text: eachMsg?.text,
      });
    };
    fetchPic();
  }, [eachMsg]);

  return (
    <div className="hismessage">
      <div className="left">
        <img
          src={
            currentUser?.profilePicture
              ? currentUser?.profilePicture
              : require("../../images/noAvatar.png")
          }
          alt=""
          className="profile"
        />
      </div>
      <div className="right">
        <div className="msgContainer">
          <span
            className="name"
            onClick={() => {
              navigate(`/profile/${eachMsg.userID}`);
              window.location.reload();
            }}
          >
            {currentUser?.username}
          </span>
          <span>{currentUser?.text}</span>
        </div>
        <div className="time">
          <span>{format(eachMsg.date)}</span>
        </div>
      </div>
    </div>
  );
}
