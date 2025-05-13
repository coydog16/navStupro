import React from 'react';
import { Inertia } from '@inertiajs/inertia';

interface AppLayoutProps {
  user: { id: number; name: string; avatar_url?: string };
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ user, children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ナビゲーションバー */}
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
        <div className="flex items-center">
          {/* 丸型プロフィールアイコン */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400 mr-3 bg-gray-200 flex items-center justify-center">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-blue-500">{user.name.charAt(0)}</span>
            )}
          </div>
          <span className="font-semibold text-gray-700">{user.name}</span>
        </div>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-semibold"
            onClick={() => Inertia.visit('/dashboard')}
          >
            自分の投稿
          </button>
          <button
            className="px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-semibold"
            onClick={() => Inertia.visit('/posts')}
          >
            みんなの投稿
          </button>
        </div>
      </nav>
      <main className="pt-6 px-4 max-w-3xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
