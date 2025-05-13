import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/Layouts/AppLayout';

interface Post {
  id: number;
  content: string;
  created_at: string;
}

interface DashboardProps {
  posts: Post[];
  user: { id: number; name: string; avatar_url?: string };
}

const DashboardIndex: React.FC<DashboardProps> = ({ posts, user }) => {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ content?: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<'self' | 'all'>('self');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.post('/posts', { content }, {
      onError: (err) => setErrors(err),
      onSuccess: () => {
        setContent('');
        setErrors({});
        setShowModal(false);
      },
    });
  };

  return (
    <AppLayout user={user}>
      {/* 上部アイコンナビ（X風・アイコンのみ） */}
      <div className="flex justify-center items-center border-b bg-white sticky top-0 z-30">
        <button
          className={`flex-1 flex items-center justify-center py-3 ${tab === 'self' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => { setTab('self'); Inertia.visit('/dashboard'); }}
          aria-label="自分の投稿（フォロー中）"
        >
          {/* フォロー中（自分）アイコン */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" /></svg>
        </button>
        <button
          className={`flex-1 flex items-center justify-center py-3 ${tab === 'all' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
          onClick={() => { setTab('all'); Inertia.visit('/posts'); }}
          aria-label="みんなの投稿（おすすめ）"
        >
          {/* おすすめ（みんな）アイコン */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2h12a2 2 0 012 2z" /></svg>
        </button>
      </div>
      <div className="max-w-3xl mx-auto p-6 pb-24">
        {/* ユーザー名は非表示に（X風） */}
        {/* 自分の投稿タイムライン */}
        <div className="space-y-4 flex flex-col">
          {posts.slice().reverse().map(post => (
            <div key={post.id} className="p-4 bg-white rounded shadow">
              <p className="text-gray-700 mt-2">{post.content}</p>
              <div className="text-sm text-gray-500 mt-2">
                {new Date(post.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        {/* 画面右下のフローティング投稿ボタン */}
        <button
          className="fixed bottom-20 right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-3xl z-50"
          onClick={() => setShowModal(true)}
          aria-label="新規投稿"
        >＋</button>
        {/* 投稿モーダル */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setShowModal(false)}
                aria-label="閉じる"
              >×</button>
              <h2 className="text-xl font-bold mb-4">新規投稿</h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="w-full border rounded p-2 mb-2"
                  placeholder="本文"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={4}
                  autoFocus
                />
                {errors.content && <div className="text-red-500 text-sm mb-2">{errors.content}</div>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">投稿する</button>
              </form>
            </div>
          </div>
        )}
        {/* 画面下部ナビゲーションバー */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-16 z-40 shadow">
          <button onClick={() => Inertia.visit('/dashboard')} className="flex flex-col items-center text-blue-600 focus:outline-none">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" /></svg>
            <span className="text-xs">自分</span>
          </button>
          <button onClick={() => Inertia.visit('/posts')} className="flex flex-col items-center text-blue-600 focus:outline-none">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2h12a2 2 0 012 2z" /></svg>
            <span className="text-xs">みんな</span>
          </button>
        </nav>
      </div>
    </AppLayout>
  );
};

export default DashboardIndex;
