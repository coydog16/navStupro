import React from 'react';

interface SwitchNavProps {
  tab: 'self' | 'all';
  onTabChange: (tab: 'self' | 'all') => void;
}

const SwitchNav: React.FC<SwitchNavProps> = ({ tab, onTabChange }) => (
  <>
    <nav className="sticky top-0 left-0 w-full bg-white border-b flex justify-around items-center h-16 z-40 shadow">
      <button
        onClick={() => onTabChange('self')}
        className={`flex flex-col items-center text-blue-600 focus:outline-none ${tab === 'self' ? 'font-bold' : ''}`}
        aria-label="自分の投稿（フォロー中）"
      >
        <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" /></svg>
        <span className="text-xs">自分</span>
      </button>
      <button
        onClick={() => onTabChange('all')}
        className={`flex flex-col items-center text-blue-600 focus:outline-none ${tab === 'all' ? 'font-bold' : ''}`}
        aria-label="みんなの投稿（おすすめ）"
      >
        <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2h12a2 2 0 012 2z" /></svg>
        <span className="text-xs">みんな</span>
      </button>
    </nav>
  </>
);

export default SwitchNav;
