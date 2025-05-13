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

  return (
    <AppLayout user={user}>
      {/* 上部アイコンナビ（X風・アイコンのみ） */}
      <div className="flex justify-center items-center border-b bg-white sticky top-0 z-30">
        <button
          className={`flex-1 flex items-center justify-center py-3 ${tab === 'self' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => { setTab('self'); window.location.href = '/dashboard'; }}
          aria-label="自分の投稿（フォロー中）"
        >
          {/* フォロー中（自分）アイコン */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" /></svg>
        </button>
        <button
          className={`flex-1 flex items-center justify-center py-3 ${tab === 'all' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => { setTab('all'); window.location.href = '/posts'; }}
          aria-label="みんなの投稿（おすすめ）"
        >
          {/* おすすめ（みんな）アイコン */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2h12a2 2 0 012 2z" /></svg>
        </button>
      </div>
      <div className="max-w-3xl mx-auto p-6 pb-24">
        {/* 投稿タイムライン（ユーザー名・アイコンのみ） */}
        <div className="space-y-4 flex flex-col">
          {posts.slice().reverse().map(post => (
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
        {/* 画面下部ナビゲーションバー */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-16 z-40 shadow">
          <button onClick={() => window.location.href = '/dashboard'} className="flex flex-col items-center text-blue-600 focus:outline-none">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" /></svg>
            <span className="text-xs">自分</span>
          </button>
          <button onClick={() => window.location.href = '/posts'} className="flex flex-col items-center text-blue-600 focus:outline-none">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2h12a2 2 0 012 2z" /></svg>
            <span className="text-xs">みんな</span>
          </button>
        </nav>
      </div>
    </AppLayout>
  );
};

export default PostIndex;
