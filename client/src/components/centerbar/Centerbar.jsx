import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../sharepost/Post";
import Sharepost from "../sharepost/Sharepost";

export default function Centerbar({ username }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/articals/personal/${username}`)
        : await axios.get(`/posts/articals/all/62fa2c9dd93863cb85292e19`);
      setPosts(res.data);
    };
    fetchPosts();
    // 第一時間user是靠父類別進行渲染，若[]則吃不到，得等user發生變化此頁再渲染
  }, [username]);
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
