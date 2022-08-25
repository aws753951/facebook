import Centerbar from "../../components/centerbar/Centerbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Nav from "../../components/navbar/Nav";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([]);
  const [logout, setLogout] = useState(false);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    setSocket(io("https://fakebookformarc.herokuapp.com/"));
  }, []);

  useEffect(() => {
    socket?.emit("add user", user._id);
    socket?.on("getUsers", (users) => {
      setOnlineUser(users.map((user) => user.userID));
    });
  }, [user._id, socket]);

  return (
    <>
      <Nav logout={logout} setLogout={setLogout} />
      <div
        className="homeContainer"
        onClick={(e) => {
          setLogout(false);
          setCancel(false);
          e.stopPropagation();
        }}
      >
        <Leftbar />
        <Centerbar user={user} cancel={cancel} setCancel={setCancel} />
        <Rightbar onlineUsers={onlineUsers} />
      </div>
    </>
  );
}
