import React from 'react';
import { getRandomEncouragement } from '../../Constants/encouragements';

interface PostFormProps {
  content: string;
  setContent: (val: string) => void;
  errors: { content?: string };
  onSubmit: (e: React.FormEvent) => void;
  isVisible: boolean;
  isClosing: boolean;
  avatar?: string;
  userName?: string;
}

/**
 * 投稿フォームコンポーネント
 * アバター、テキストエリア、エラーメッセージを含みます
 */
const PostForm: React.FC<PostFormProps> = ({
  content,
  setContent,
  errors,
  onSubmit,
  isVisible,
  isClosing,
  avatar = '',
  userName = ''
}) => {
  // コンテンツの表示状態管理
  const [contentVisible, setContentVisible] = React.useState(false);
  
  // アニメーション完了後に内容を表示
  React.useEffect(() => {
    if (isVisible && !isClosing) {
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [isVisible, isClosing]);
  
  // 投稿処理のハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() !== '') {
      onSubmit(e);
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className={`flex-1 flex flex-col overflow-hidden ${contentVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}
      style={{ touchAction: 'none' }} // スクロールを無効化
    >
      <div className="flex p-4 pb-0 h-full">
        {/* ユーザーアバター */}
        <div className="mr-3 flex-shrink-0 mt-1">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {avatar ? (
              <img 
                src={avatar} 
                alt={userName || 'ユーザーアバター'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* 投稿入力エリア */}
        <textarea
          className="w-full flex-1 border-none resize-none text-lg pb-24 focus:ring-0 focus:ring-offset-0 focus:outline-none focus:shadow-none"
          style={{ 
            outline: 'none', 
            boxShadow: 'none',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            touchAction: 'manipulation'
          }}
          placeholder={getRandomEncouragement()}
          value={content}
          onChange={e => setContent(e.target.value)}
          autoFocus={contentVisible}
          onFocus={e => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>
      
      {/* エラーメッセージ表示 */}
      {errors.content && (
        <div className="p-3 px-4 text-left">
          <div className="text-red-500 text-sm ml-12">{errors.content}</div>
        </div>
      )}
    </form>
  );
};

export default PostForm;
