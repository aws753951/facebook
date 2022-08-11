import Post from "../sharepost/Post";
import Sharepost from "../sharepost/Sharepost";

export default function Centerbar() {
  return (
    <div className="centerbarContainer">
      <div className="centerWrapper">
        <Sharepost />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
