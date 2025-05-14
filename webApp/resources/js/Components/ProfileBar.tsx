import React, { useState, useEffect } from 'react';
import TodoList from '@/Components/TodoList';
import PostCalendar from '@/Components/PostCalendar';

interface ProfileBarProps {
  user: { name: string; avatar_url?: string };
  postDates: string[]; // 追加: 投稿日時の配列
  today?: string; // 追加: 今日の日付
}

const ProfileBar: React.FC<ProfileBarProps> = ({ user, postDates, today }) => {
  // ToDoリストをlocalStorageで永続化
  const storageKey = `todos_${user.name}`;
  const [todos, setTodos] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos, storageKey]);

  return (
    <div className="w-full bg-white flex flex-col px-4 pt-4 pb-2 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 bg-gray-200 flex items-center justify-center">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-blue-500">{user.name.charAt(0)}</span>
            )}
          </div>
          <span className="ml-4 font-semibold text-gray-700 text-lg">{user.name}</span>
        </div>
        {/* 投稿カレンダー */}
        <PostCalendar postDates={postDates} today={today} />
      </div>
      {/* ToDoリスト */}
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default ProfileBar;
