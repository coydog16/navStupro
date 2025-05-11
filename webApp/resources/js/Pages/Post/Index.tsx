import React from 'react';
import { PageProps } from '@/types';

interface Post {
  id: number;
  title: string;
  body: string;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
}

interface PostIndexProps extends PageProps {
  posts: Post[];
}

const PostIndex: React.FC<PostIndexProps> = ({ posts }) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">投稿一覧</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700 mt-2">{post.body}</p>
            <div className="text-sm text-gray-500 mt-2">
              by {post.user.name} / {new Date(post.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostIndex;
