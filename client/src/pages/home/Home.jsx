import Centerbar from "../../components/centerbar/Centerbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Nav from "../../components/navbar/Nav";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

export default function Home() {
  const { user, dispatch } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([]);

  useEffect(() => {
    setSocket(io("ws://localhost:6970"));
  }, []);

  useEffect(() => {
    socket?.emit("add user", user._id);
    socket?.on("getUsers", (users) => {
      setOnlineUser(users.map((user) => user.userID));
    });
  }, [user.id, socket]);

  return (
    <>
      <Nav />
      <div className="homeContainer">
        <Leftbar />
        <Centerbar user={user} />
        <Rightbar onlineUsers={onlineUsers} />
      </div>
    </>
  );
}
