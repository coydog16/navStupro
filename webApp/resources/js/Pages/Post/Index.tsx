import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

interface Post {
  id: number;
  content: string;
  user: { id: number; name: string; avatar_url?: string };
  created_at: string;
}

interface PostIndexProps {
  posts: Post[];
  user: { id: number; name: string; avatar_url?: string };
}

const PostIndex: React.FC<PostIndexProps> = ({ posts, user }) => {
  const [tab, setTab] = useState<'self' | 'all'>('all');
  const handleTabChange = (tab: 'self' | 'all') => {
    setTab(tab);
    if (tab === 'self') {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/posts';
    }
  };

  // 自分の投稿だけ抽出（user.idが一致するもの）
  const myPostDates = posts.filter(p => p.user && p.user.id === user.id).map(p => p.created_at);

  return (
    <AppLayout user={user} postDates={myPostDates}>
      <div className="max-w-3xl mx-auto p-6 pb-24 pt-20">
        {/* 投稿タイムライン（ユーザー名・アイコンのみ） */}
        <div className="space-y-4 flex flex-col">
          {posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(post => (
            <div key={post.id} className="p-4 bg-white rounded shadow">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-300 mr-2 bg-gray-200 flex items-center justify-center">
                  {post.user.avatar_url ? (
                    <img src={post.user.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-blue-500">{post.user.name.charAt(0)}</span>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mt-2">{post.content}</p>
              <div className="text-sm text-gray-500 mt-2">
                {new Date(post.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default PostIndex;
