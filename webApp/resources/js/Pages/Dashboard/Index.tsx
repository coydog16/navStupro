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

  const handleTabChange = (tab: 'self' | 'all') => {
    setTab(tab);
    if (tab === 'self') {
      Inertia.visit('/dashboard');
    } else {
      Inertia.visit('/posts');
    }
  };

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

  // Dashboardは自分の投稿のみなので、postsの全ての日付を使う
  const myPostDates = posts.map(p => p.created_at);

  return (
    <AppLayout user={user} postDates={myPostDates}>
      <div className="max-w-3xl mx-auto p-6 pb-24 pt-36">
        {/* 自分の投稿タイムライン */}
        <div className="space-y-4 flex flex-col">
          {posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(post => (
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
        {/* 画面下部ナビゲーションバー（AppLayoutに移動済み） */}
        {/* <BottomNav onTabChange={handleTabChange} /> */}
      </div>
    </AppLayout>
  );
};

export default DashboardIndex;
