import Post from "../sharepost/Post";
import Sharepost from "../sharepost/Sharepost";
import { Posts } from "../../dummy";

export default function Centerbar() {
  return (
    <div className="centerbarContainer">
      <div className="centerWrapper">
        <Sharepost />
        {Posts.map((item) => (
          <Post key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
