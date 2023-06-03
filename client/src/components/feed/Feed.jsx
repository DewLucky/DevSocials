import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Feed({username}) {

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = username 
      ? await axios.get(`/api/posts/profile/${username}`)
      : await axios.get("/api/posts/timeline/6463e4a20360adb3fcb868d1");
      setPosts(res.data)
    }
    fetchPosts()
  },[username])


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
