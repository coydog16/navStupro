import React, { useState, useEffect } from 'react';
import ModalHeader from './ModalHeader';
import PostForm from './PostForm';

/**
 * 投稿モーダルのプロパティ
 */
interface PostModalProps {
  content: string;
  setContent: (val: string) => void;
  errors: { content?: string };
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  avatar?: string;
  userName?: string;
}

/**
 * 投稿モーダル
 * 下からスライドインするアニメーション付きモーダル
 */
const PostModal: React.FC<PostModalProps> = ({ 
  content, 
  setContent, 
  errors, 
  onSubmit, 
  onClose,
  avatar = '', 
  userName = '' 
}) => {
  // アニメーション用のステート
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  // マウント時にアニメーションを開始し、bodyのスクロールを無効化
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    
    // bodyのスクロールを無効化
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalStyle;
    };
  }, []);
  
  // モーダルを閉じる処理（アニメーション付き）
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };
  
  // 投稿ボタン押下時の処理
  const handleSubmitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (content.trim() !== '') {
      setIsClosing(true);
      setTimeout(() => onSubmit(e as unknown as React.FormEvent), 300);
    }
  };
  
  return (
    <div 
      className={`fixed inset-0 bg-white z-50 ${isClosing ? 'bg-opacity-0 transition-all duration-300' : ''} focus:outline-none focus:ring-0`}
      style={{ overflowY: 'hidden' }}
    >
      <div 
        className={`w-full h-full flex flex-col transition-transform duration-300 ease-out transform ${
          isVisible && !isClosing ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ overscrollBehavior: 'none' }}
      >
        {/* ヘッダー部分 */}
        <ModalHeader 
          onCancel={handleClose}
          onSubmit={handleSubmitClick}
          isSubmitDisabled={content.trim() === ''}
        />
        
        {/* 投稿フォーム部分 */}
        <PostForm
          content={content}
          setContent={setContent}
          errors={errors}
          onSubmit={onSubmit}
          isVisible={isVisible}
          isClosing={isClosing}
          avatar={avatar}
          userName={userName}
        />
      </div>
    </div>
  );
};

export default PostModal;
