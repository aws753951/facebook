import Personcover from "../../components/personcover/Personcover";
import Personinfo from "../../components/personinfo/Personinfo";
import Nav from "../../components/navbar/Nav";
import Centerbar from "../../components/centerbar/Centerbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});

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

  return (
    <>
      <Nav />
      <div className="profile">
        <div className="profileWrapper">
          <div className="profileTop">
            <Personcover currentUser={currentUser} />
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
