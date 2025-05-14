import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import BottomNav from '@/Components/BottomNav';
import ProfileBar from '@/Components/ProfileBar';
import SwitchNav from '@/Components/SwitchNav';

interface AppLayoutProps {
  user: { id: number; name: string; avatar_url?: string };
  postDates?: string[]; // 投稿カレンダー用
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ user, postDates = [], children }) => {
  // SwitchNavのタブ状態をAppLayoutで管理
  const [tab, setTab] = React.useState<'self' | 'all'>(user ? 'self' : 'all');
  const handleTabChange = (tab: 'self' | 'all') => {
    setTab(tab);
    if (tab === 'self') {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/posts';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* プロフィールバー（カレンダー・ToDo付き） */}
      <ProfileBar user={user} postDates={postDates} today="2025-05-13" />
      {/* 上部アイコンナビ（X風・アイコンのみ） */}
      <div className="max-w-3xl mx-auto sticky top-0 z-40">
        <SwitchNav tab={tab} onTabChange={handleTabChange} />
      </div>
      <main className="pt-6 px-4 max-w-3xl mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
