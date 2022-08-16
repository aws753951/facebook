import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Post from "../sharepost/Post";
import Sharepost from "../sharepost/Sharepost";

export default function Centerbar({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/articals/personal/${username}`)
        : await axios.get(`/posts/articals/all/${user._id}`);
      setPosts(res.data);
    };
    fetchPosts();
    // 第一時間user是靠父類別進行渲染，若[]則吃不到，得等user發生變化此頁再渲染
  }, [username, user._id]);

  return (
    <div className="centerbarContainer">
      <div className="centerWrapper">
        <Sharepost />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
