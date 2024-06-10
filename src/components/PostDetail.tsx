import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3002/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: post.title }}></h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <p>Posted by {post.postedBy} on {new Date(post.postedAt).toLocaleDateString()}</p>
    </div>
  );
}

export default PostDetail;
