import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('http://backend:3002/posts')  // ใช้ hostname ของ backend ใน Docker network
      .then(response => {
        setPosts(response.data);
        console.log('Fetched posts:', response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <h2 dangerouslySetInnerHTML={{ __html: post.title }}></h2>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <p>Posted by {post.postedBy} on {new Date(post.postedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
