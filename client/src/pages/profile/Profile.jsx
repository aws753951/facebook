import Personcover from "../../components/personcover/Personcover";
import Personinfo from "../../components/personinfo/Personinfo";
import Nav from "../../components/navbar/Nav";
import Centerbar from "../../components/centerbar/Centerbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user2, setUser2] = useState({});
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser2(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Nav />
      <div className="profile">
        <div className="profileWrapper">
          <div className="profileTop">
            <Personcover user2={user2} />
          </div>

          <div className="profileBottom">
            <div className="profileBottomLeft">
              <Personinfo user2={user2} />
            </div>
            <div className="profileBottomRight">
              <Centerbar username={username} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
