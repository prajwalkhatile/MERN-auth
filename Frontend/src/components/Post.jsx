// PostList.js

import React, { useState, useEffect } from "react";
import postsData from "../../data";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

const PostList = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      // console.log(res)
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMoreData = () => {
    setTimeout(() => {
      const currentLength = posts.length;
      const newPosts = postsData.slice(currentLength, currentLength + 10);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      if (currentLength + 10 >= postsData.length) {
        setHasMore(false);
      }
    }, 1500);
  };

  return (
    <div className="bg-gray-100 py-8 flex justify-center">
      <div className="container mx-auto">
        <div className="flex justify-between cursor-pointer">
          <h1 className="text-3xl font-bold mb-4">Posts</h1>
          <h1 onClick={handleLogout} className="text-xl font-bold mb-4">
            Logout
          </h1>
        </div>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more posts to load</p>}
        >
          <div className="flex flex-col justify-center items-center">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md mb-4 p-6 w-80 "
              >
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p>
                  <strong>Author:</strong> {post.author}
                </p>
                <p>{post.description}</p>
                <p>
                  <strong>Published by:</strong> {post.publisher}
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(post.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PostList;
