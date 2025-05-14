import React from 'react';

const BottomNav: React.FC = () => (
  <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-16 z-40 shadow">
    <a href="/dashboard" className="flex flex-col items-center text-blue-600 focus:outline-none">
      {/* 家マークのアイコン */}
      <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" /></svg>
      <span className="text-xs">ホーム</span>
    </a>
    {/* 今後アイコンをここに追加していく */}
  </nav>
);

export default BottomNav;
