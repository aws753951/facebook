import Personcover from "../../components/personcover/Personcover";
import Personinfo from "../../components/personinfo/Personinfo";
import Post from "../../components/sharepost/Post";
import Sharepost from "../../components/sharepost/Sharepost";
import { Posts } from "../../dummy";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profileWrapper">
        <div className="profileTop">
          <Personcover />
        </div>

        <div className="profileBottom">
          <div className="profileBottomLeft">
            <Personinfo />
          </div>
          <div className="profileBottomRight">
            <Sharepost />
            {Posts.map((item) => (
              <Post key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
