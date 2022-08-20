import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../sharepost/Post";
import Sharepost from "../sharepost/Sharepost";

export default function Centerbar({ user, userID }) {
  const [posts, setPosts] = useState([]);
  // userID is the guy you want to check, user is you.

  useEffect(() => {
    const fetchPosts = async () => {
      const res = userID
        ? await axios.get(`/posts/articals/personal/${userID}`)
        : await axios.get(`/posts/articals/all/${user._id}`);
      setPosts(
        res.data.sort((a, b) => {
          // cant use timestrip to sort, need change to Date
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    };
    fetchPosts();
    // 第一時間user是靠父類別進行渲染，若[]則吃不到，得等user發生變化此頁再渲染
  }, [userID, user._id]);

  return (
    <div className="centerbarContainer">
      <div className="centerWrapper">
        {(!userID || userID === user._id) && <Sharepost />}
        {posts && posts.map((post) => <Post key={post._id} post={post} />)}
        {/* 都沒有貼文且不是本人查看的話 */}
        {posts && posts.length === 0 && userID && userID !== user._id && (
          <div className="noPost">
            <span>貼文</span>
          </div>
        )}
      </div>
    </div>
  );
}
