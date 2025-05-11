import React from 'react';
import { PageProps } from '@/types';

interface UserProfileProps extends PageProps {
  user: {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar_url?: string;
    // 必要に応じて他のプロパティも追加
  };
}

const Profile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex items-center space-x-4">
        {user.avatar_url ? (
          <img src={user.avatar_url} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
            {user.name.charAt(0)}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      {user.bio && (
        <div className="mt-4">
          <h3 className="font-semibold">自己紹介</h3>
          <p>{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
